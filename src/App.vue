<script setup>
import { ref } from 'vue'
import MenuBar from './components/MenuBar.vue'
import ToolBar from './components/ToolBar.vue'

const currentTool = ref(null)

const handleToolClick = (toolName) => {
  currentTool.value = toolName
  console.log('选中的工具:', toolName)
}
</script>

<template>
  <div class="app-container flex flex-col h-screen">
    <MenuBar />
    <div class="flex flex-1 overflow-hidden">
      <ToolBar @tool-click="handleToolClick" />
      <div class="flex-1 bg-[#1e1e1e] text-white p-4">
        <p>当前工具：{{ currentTool || '无' }}</p>
      </div>
    </div>
  </div>
</template>

<style>
/* 全局重置：让根元素占满视口 */
html, body {
  margin: 0;
  height: 100%;
}
#app {
  height: 100%;
}
</style>