<template>
  <!-- 
    工具栏容器：固定宽度 60px，深色背景，垂直排列，与菜单栏同色系
    高度设置为 100vh - 40px（减去菜单栏高度），或由父容器控制
    这里使用 calc(100vh - 40px) 并配合 position: sticky 或固定定位
    为保证通用性，我们使用 height: 100% 并由父容器约束。
  -->
  <div class="tool-bar flex flex-col items-center py-2 bg-[#1c1c1c] text-white w-15 border-r border-gray-700">
    <!-- 工具图标列表 -->
    <div
      v-for="tool in tools"
      :key="tool.name"
      class="tool-icon flex items-center justify-center w-10 h-10 rounded-lg cursor-pointer transition-all"
      :class="{
        'bg-blue-500/20 text-blue-400': activeTool === tool.name,
        'hover:bg-white/10 text-gray-400 hover:text-white': activeTool !== tool.name
      }"
      @click="toggleTool(tool.name)"
    >
      <!-- 使用 Element Plus 图标组件，大小 20px -->
      <el-icon :size="20">
        <component :is="tool.icon" />
      </el-icon>
    </div>

    <!-- 底部可添加额外的操作（如设置等），留空 -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  FolderOpened,   // 资源管理器
  Search,         // 搜索
  Document,       // 源代码管理器（Git）
  Monitor         // 运行和调试（可用 Monitor 或 VideoPlay）
} from '@element-plus/icons-vue'

// 工具列表配置：名称、显示标签、图标组件
const tools = [
  { name: 'explorer', label: '资源管理器', icon: FolderOpened },
  { name: 'search', label: '搜索', icon: Search },
  { name: 'sourceControl', label: '源代码管理器', icon: Document },
  { name: 'runDebug', label: '运行和调试', icon: Monitor }
]

// 当前激活的工具（默认选中资源管理器，可设为 null）
const activeTool = ref('explorer')

// 事件定义：向父组件传递工具点击事件
const emit = defineEmits(['tool-click'])

// 切换工具：若点击已激活的则取消激活（设为 null），否则激活并发射事件
const toggleTool = (name) => {
  if (activeTool.value === name) {
    // 如果点击已激活的，则取消激活（可选）
    activeTool.value = null
    emit('tool-click', null)
  } else {
    activeTool.value = name
    emit('tool-click', name)
  }
}
</script>

<style scoped>
/* 工具栏自身高度：填满父容器（由父组件约束），底部留白 */
.tool-bar {
  height: 100%; /* 父容器需设置高度，例如 flex-1 或 calc(100vh - 40px) */
  min-height: calc(100vh - 40px); /* 备选：减去菜单栏高度 */
}

/* 每个图标按钮的尺寸和悬停过渡 */
.tool-icon {
  font-size: 20px;
  transition: background-color 0.2s, color 0.2s;
}

/* 激活状态背景微光，无额外的边框，保持简洁 */
</style>