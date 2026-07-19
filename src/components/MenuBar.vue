<template>
  <div class="menu-bar flex items-center h-10 bg-[#1c1c1c] text-white">
    <!-- 程序图标区域 -->
    <div class="app-icon flex items-center px-4 select-none">
      <img src="/favicon.svg" class="h-5 w-5" />
    </div>

    <!-- 横向主菜单 -->
    <el-menu
      mode="horizontal"
      background-color="transparent"
      text-color="#ffffff"
      active-text-color="#ffffff"
      class="flex-1 border-0 menu-wrapper"
    >
      <!-- 文件 -->
      <el-sub-menu index="file">
        <template #title>文件</template>
        <el-menu-item index="file-new">新建</el-menu-item>
        <el-menu-item index="file-open">打开</el-menu-item>
        <el-menu-item index="file-save">保存</el-menu-item>
        <el-menu-item index="file-save-as">另存为</el-menu-item>
        <el-menu-item index="file-exit">退出</el-menu-item>
      </el-sub-menu>

      <!-- 编辑 -->
      <el-sub-menu index="edit">
        <template #title>编辑</template>
        <el-menu-item index="edit-undo">撤销</el-menu-item>
        <el-menu-item index="edit-redo">重做</el-menu-item>
        <el-menu-item index="edit-cut">剪切</el-menu-item>
        <el-menu-item index="edit-copy">复制</el-menu-item>
        <el-menu-item index="edit-paste">粘贴</el-menu-item>
        <el-menu-item index="edit-find">查找</el-menu-item>
      </el-sub-menu>

      <!-- 选择 -->
      <el-sub-menu index="selection">
        <template #title>选择</template>
        <el-menu-item index="sel-all">全选</el-menu-item>
        <el-menu-item index="sel-line">选择行</el-menu-item>
        <el-menu-item index="sel-word">选择单词</el-menu-item>
      </el-sub-menu>

      <!-- 视图 -->
      <el-sub-menu index="view">
        <template #title>视图</template>
        <el-menu-item index="view-theme">主题</el-menu-item>
        <el-menu-item index="view-sidebar">侧边栏</el-menu-item>
        <el-menu-item index="view-terminal">终端</el-menu-item>
        <el-menu-item index="view-fullscreen">全屏</el-menu-item>
      </el-sub-menu>

      <!-- 导航 -->
      <el-sub-menu index="navigate">
        <template #title>导航</template>
        <el-menu-item index="nav-back">后退</el-menu-item>
        <el-menu-item index="nav-forward">前进</el-menu-item>
        <el-menu-item index="nav-goto">跳转到行</el-menu-item>
      </el-sub-menu>

      <!-- 转到 -->
      <el-sub-menu index="go">
        <template #title>转到</template>
        <el-menu-item index="go-file">转到文件</el-menu-item>
        <el-menu-item index="go-symbol">转到符号</el-menu-item>
        <el-menu-item index="go-declaration">转到定义</el-menu-item>
      </el-sub-menu>

      <!-- 工具 -->
      <el-sub-menu index="tools">
        <template #title>工具</template>
        <el-menu-item index="tool-settings">设置</el-menu-item>
        <el-menu-item index="tool-shortcuts">快捷键</el-menu-item>
      </el-sub-menu>

      <!-- 终端 -->
      <el-sub-menu index="terminal">
        <template #title>终端</template>
        <el-menu-item index="term-new">新建终端</el-menu-item>
        <el-menu-item index="term-split">拆分终端</el-menu-item>
      </el-sub-menu>

      <!-- 帮助 -->
      <el-sub-menu index="help">
        <template #title>帮助</template>
        <el-menu-item index="help-docs">文档</el-menu-item>
        <el-menu-item index="help-about">关于</el-menu-item>
      </el-sub-menu>
    </el-menu>

    <!-- ========== 右侧操作区：全屏按钮 + 用户头像 ========== -->
    <div class="flex items-center gap-3 px-4">
      <!-- 用户头像 -->
      <el-avatar
        :size="32"
        src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        alt="用户头像"
        class="border-2 border-gray-600 hover:border-blue-400 transition-colors cursor-pointer"
      />

      <!-- 全屏切换按钮 -->
      <el-tooltip :content="isFullscreen ? '退出全屏' : '全屏'" placement="bottom">
        <div
          class="fullscreen-btn flex items-center justify-center w-8 h-8 rounded hover:bg-white/10 cursor-pointer transition-colors"
          @click="toggleFullscreen"
        >
          <el-icon :size="20">
            <!-- 根据全屏状态切换图标 -->
            <FullScreen v-if="!isFullscreen" />
            <Close v-else />
          </el-icon>
        </div>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { FullScreen, Close } from '@element-plus/icons-vue'

// 全屏状态
const isFullscreen = ref(false)

// 切换全屏
const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    // 进入全屏
    document.documentElement.requestFullscreen?.() ||
      document.documentElement.webkitRequestFullscreen?.()
  } else {
    // 退出全屏
    document.exitFullscreen?.() || document.webkitExitFullscreen?.()
  }
}

// 监听全屏变化事件，同步状态
const onFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement
}

onMounted(() => {
  document.addEventListener('fullscreenchange', onFullscreenChange)
  document.addEventListener('webkitfullscreenchange', onFullscreenChange)
})

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', onFullscreenChange)
  document.removeEventListener('webkitfullscreenchange', onFullscreenChange)
})
</script>

<style scoped>
/* 去掉菜单容器自带的底部边框，避免与菜单栏边框重复 */
.menu-wrapper {
  border-bottom: none !important;
  display: flex;
  align-items: center;
}

/* 子菜单标题的高度、行高、内边距和字体大小 */
:deep(.el-sub-menu__title) {
  height: 40px !important;
  line-height: 40px !important;
  padding: 0 14px !important;
  font-size: 14px;
}

/* 鼠标悬停时，子菜单标题背景颜色变浅，增强交互反馈 */
:deep(.el-sub-menu__title:hover) {
  background-color: rgba(255, 255, 255, 0.08) !important;
}

/* 隐藏子菜单标题右侧的小箭头 */
:deep(.el-sub-menu__title .el-icon) {
  display: none !important;
}

/*
  下拉弹出菜单（子菜单列表）的背景和边框
  使用深色背景以匹配整体主题
*/
:global(.el-menu--popup) {
  background-color: #1c1c1c !important;
  border-color: #1c1c1c !important;
}

/* 弹出菜单中的菜单项样式，设置菜单项的文本颜色 */
:global(.el-popper .el-menu--popup .el-menu-item) {
  color: #ffffff !important; /* 白色 */
  font-size: 13px;
}

/* 弹出菜单项悬停效果：淡蓝色背景 + 亮蓝色文字 */
:global(.el-menu--popup .el-menu-item:hover) {
  background-color: rgba(96, 165, 250, 0.15) !important; /* 半透明 blue-400 */
  color: #60a5fa !important; /* blue-400 */
}

/* 水平菜单的子菜单项之间无底部边框（去除默认分割线） */
:deep(.el-menu--horizontal > .el-sub-menu) {
  border-bottom: none !important;
}

/* 水平菜单的子菜单标题无底部边框 */
:deep(.el-menu--horizontal .el-sub-menu__title) {
  border-bottom: none !important;
}
</style>
