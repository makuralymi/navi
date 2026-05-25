<template>
  <header class="app-header">
    <div class="header-left">
      <ThemeToggle />
    </div>
    <div class="glass-radio-group">
      <input
        type="radio"
        id="glass-home"
        name="glass-radio"
        value="home"
        :checked="activeTab === 'home'"
        @change="switchTab('home')"
      />
      <label for="glass-home">首页</label>

      <input
        type="radio"
        id="glass-contact"
        name="glass-radio"
        value="contact"
        :checked="activeTab === 'contact'"
        @change="switchTab('contact')"
      />
      <label for="glass-contact">联系我</label>

      <input
        type="radio"
        id="glass-announce"
        name="glass-radio"
        value="announce"
        :checked="activeTab === 'announce'"
        @change="switchTab('announce')"
      />
      <label for="glass-announce">公告</label>

      <div class="glass-glider"></div>
    </div>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue'
import ThemeToggle from './ThemeToggle.vue'

const props = defineProps({
  tab: { type: String, default: 'home' }
})

const emit = defineEmits(['navigate', 'contact'])

const activeTab = ref(props.tab)

watch(() => props.tab, (val) => {
  activeTab.value = val
})

function switchTab(val) {
  activeTab.value = val
  if (val === 'contact') {
    emit('contact')
  } else {
    emit('navigate', val)
  }
}
</script>

<style scoped>
.header-left {
  display: flex;
  align-items: center;
}

.glass-radio-group {
  --bg: rgba(255, 255, 255, 0.4);
  --text: #6e6e73;

  display: flex;
  position: relative;
  background: var(--bg);
  border-radius: 1rem;
  backdrop-filter: blur(12px);
  box-shadow:
    inset 1px 1px 4px rgba(255, 255, 255, 0.8),
    inset -1px -1px 6px rgba(0, 0, 0, 0.05),
    0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  width: fit-content;
}

.glass-radio-group input {
  display: none;
}

.glass-radio-group label {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
  font-size: 14px;
  padding: 0.8rem 1.6rem;
  cursor: pointer;
  font-weight: 600;
  letter-spacing: 0.3px;
  color: var(--text);
  position: relative;
  z-index: 2;
  transition: color 0.3s ease-in-out;
  user-select: none;
}

.glass-radio-group label:hover {
  color: #333;
}

.glass-radio-group input:checked + label {
  color: #222;
}

.glass-glider {
  position: absolute;
  top: 0;
  bottom: 0;
  width: calc(100% / 3);
  border-radius: 1rem;
  z-index: 1;
  transition:
    transform 0.5s cubic-bezier(0.37, 1.95, 0.66, 0.56),
    background 0.4s ease-in-out,
    box-shadow 0.4s ease-in-out;
}

.glass-radio-group:has(#glass-home:checked) .glass-glider {
  transform: translateX(0%);
  background: linear-gradient(135deg, #fdfbfb, #ebedee);
  box-shadow:
    0 0 18px rgba(235, 237, 238, 0.4),
    0 0 10px rgba(255, 255, 255, 0.6) inset;
}

.glass-radio-group:has(#glass-contact:checked) .glass-glider {
  transform: translateX(100%);
  background: linear-gradient(135deg, #ffe0fb, #fa9fc2);
  box-shadow:
    0 0 18px rgba(250, 159, 194, 0.4),
    0 0 10px rgba(255, 180, 210, 0.6) inset;
}

.glass-radio-group:has(#glass-announce:checked) .glass-glider {
  transform: translateX(200%);
  background: linear-gradient(135deg, #e0f2fe, #bae6fd);
  box-shadow:
    0 0 18px rgba(186, 230, 253, 0.4),
    0 0 10px rgba(200, 240, 255, 0.6) inset;
}

@media (max-width: 768px) {
  .glass-radio-group label {
    min-width: 72px;
    font-size: 12px;
    padding: 0.6rem 1rem;
  }
}

@media (max-width: 480px) {
  .glass-radio-group label {
    min-width: 56px;
    font-size: 11px;
    padding: 0.5rem 0.8rem;
  }
}
</style>
