<template>
  <main class="app-content" ref="contentRef">
    <div v-if="isSearching && filteredSites.length === 0" class="search-empty">
      <span class="search-empty-icon">🔍</span>
      <p>未找到匹配的站点</p>
    </div>
    <div v-else class="card-grid" :style="{ '--cols': gridColumns }" :key="isSearching ? 'search' : activeIndex">
      <NavCard
        v-for="(site, idx) in displaySites"
        :key="site.title + (isSearching ? '-s' : '')"
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
  },
  searchQuery: {
    type: String,
    default: ''
  }
})

const isSearching = computed(() => props.searchQuery.trim().length > 0)

const currentCategory = computed(() => {
  return siteData[props.activeIndex] || siteData[0]
})

const filteredSites = computed(() => {
  if (!isSearching.value) return []
  const q = props.searchQuery.trim().toLowerCase()
  const results = []
  for (const cat of siteData) {
    for (const site of cat.sites) {
      if (
        site.title.toLowerCase().includes(q) ||
        site.description.toLowerCase().includes(q)
      ) {
        results.push(site)
      }
    }
  }
  return results
})

const displaySites = computed(() => {
  if (isSearching.value) return filteredSites.value
  return currentCategory.value.sites
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
  const count = displaySites.value?.length || 0
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

<style scoped>
.search-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  color: #8b9eb0;
  gap: 16px;
}

.search-empty-icon {
  font-size: 3rem;
  opacity: 0.5;
}

.search-empty p {
  font-size: 1rem;
  letter-spacing: 0.5px;
}

html.dark .search-empty {
  color: #6b7d90;
}
</style>
