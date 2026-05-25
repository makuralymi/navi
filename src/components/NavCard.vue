<template>
  <a :href="url" target="_blank" class="nav-card">
    <div class="card-content-default">
      <img v-if="resolvedIcon" :src="resolvedIcon" class="card-icon-img" alt="" />
      <span v-else class="card-icon">{{ icon }}</span>
      <h3>{{ title }}</h3>
    </div>
    <div class="card-content-hover">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>
    <div class="go-corner">
      <div class="go-arrow">→</div>
    </div>
  </a>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: '这是一个高级感悬浮卡片示例描述等文本内...'
  },
  url: {
    type: String,
    default: '#'
  },
  icon: {
    type: String,
    default: '✨'
  }
})

const iconModules = import.meta.glob('../icon/*', { eager: true, query: '?url', import: 'default' })

const iconMap = Object.fromEntries(
  Object.entries(iconModules).map(([path, url]) => {
    const filename = path.split('/').pop()
    return [filename, url]
  })
)

const isRemoteUrl = computed(() => /^https?:\/\//.test(props.icon))

const isLocalFile = computed(() => {
  return !isRemoteUrl.value && /\.\w+$/.test(props.icon) && iconMap[props.icon]
})

const resolvedIcon = computed(() => {
  if (isRemoteUrl.value) return props.icon
  if (isLocalFile.value) return iconMap[props.icon]
  return null
})
</script>

<style scoped>
</style>
