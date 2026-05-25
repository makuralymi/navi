<template>
  <main class="app-content" ref="contentRef">
    <div class="card-grid" v-if="currentCategory" :style="{ '--cols': gridColumns }" :key="activeIndex">
      <NavCard
        v-for="(site, idx) in currentCategory.sites"
        :key="site.title"
        :title="site.title"
        :description="site.description"
        :url="site.url"
        :icon="site.icon"
        :style="{ '--card-delay': idx * 0.06 + 's' }"
      />
    </div>
  </main>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import NavCard from './NavCard.vue'
import { siteData } from '../data/index.js'

const props = defineProps({
  activeIndex: {
    type: Number,
    default: 0
  }
})

const currentCategory = computed(() => {
  return siteData[props.activeIndex] || siteData[0]
})

const contentRef = ref(null)
const containerWidth = ref(1200)

let resizeObserver = null

function getOptimalColumns(itemCount, width) {
  const CARD_MIN = 180
  const GAP = 24
  const MAX_COLS = 5

  let maxCols = Math.floor((width + GAP) / (CARD_MIN + GAP))
  maxCols = Math.max(1, Math.min(MAX_COLS, maxCols))

  let cols = Math.min(maxCols, itemCount)

  while (cols > 1 && itemCount % cols === 1) {
    cols--
  }

  return cols
}

const gridColumns = computed(() => {
  const count = currentCategory.value?.sites?.length || 0
  if (count === 0) return 1
  return getOptimalColumns(count, containerWidth.value)
})

onMounted(() => {
  if (contentRef.value) {
    resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        containerWidth.value = entry.contentRect.width
      }
    })
    resizeObserver.observe(contentRef.value)
  }
})

onUnmounted(() => {
  resizeObserver?.disconnect()
})
</script>
