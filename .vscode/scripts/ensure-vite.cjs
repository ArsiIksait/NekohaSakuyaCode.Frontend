const net = require('net');
const { spawn } = require('child_process');
const path = require('path');

const PORT = 5173;
const VITE_DIR = path.join(__dirname, '..', '..');  // 如果脚本在 .vscode/scripts 下，则上两级到 ClientApp
console.log(`VITE_DIR: ${VITE_DIR}`);

function isPortInUse(port) {
    return new Promise((resolve) => {
        const client = net.createConnection({ port }, () => {
            client.destroy();
            resolve(true);
        });
        client.on('error', () => {
            resolve(false);
        });
    });
}

async function main() {
    const inUse = await isPortInUse(PORT);
    if (inUse) {
        console.log(`✅ Vite 已在端口 ${PORT} 运行，跳过启动。`);
        process.exit(0);
    }

    console.log(`🚀 端口 ${PORT} 空闲，正在启动 Vite...`);
    const child = spawn('npm run dev', {
        cwd: VITE_DIR,
        stdio: 'ignore',
        detached: true,
        shell: true
    });
    child.unref();

    // 轮询检测端口，最多 30 秒
    let ready = false;
    for (let i = 0; i < 30; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (await isPortInUse(PORT)) {
            ready = true;
            break;
        }
    }

    if (ready) {
        console.log('✅ Vite 已就绪，可以调试了。');
        process.exit(0);
    } else {
        console.error('❌ Vite 启动超时，请检查日志。');
        process.exit(1);
    }
}

main().catch(err => {
    console.error('❌ 启动 Vite 失败:', err);
    process.exit(1);
});