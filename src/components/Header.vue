<template>
  <header class="app-header">
    <div class="header-left">
      <ThemeToggle />
    </div>
    <div class="header-center">
      <div class="search-glass">
        <div class="form-control">
          <input
            type="text"
            id="nav-search"
            v-model="query"
            @input="onSearch"
            :class="{ filled: query.length > 0 }"
            autocomplete="off"
          />
          <label for="nav-search">
            <span
              v-for="(char, i) in labelChars"
              :key="i"
              :style="{ transitionDelay: i * 50 + 'ms' }"
            >{{ char }}</span>
          </label>
        </div>
      </div>
    </div>
    <div class="header-right">
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
      <button class="settings-btn" @click="onSettings" aria-label="设置">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import ThemeToggle from './ThemeToggle.vue'

const props = defineProps({
  tab: { type: String, default: 'home' }
})

const emit = defineEmits(['navigate', 'contact', 'announce', 'search', 'settings'])

const activeTab = ref(props.tab)

watch(() => props.tab, (val) => {
  activeTab.value = val
})

function switchTab(val) {
  activeTab.value = val
  if (val === 'contact') {
    emit('contact')
  } else if (val === 'announce') {
    emit('announce')
  } else {
    emit('navigate', val)
  }
}

const query = ref('')
const labelChars = computed(() => '搜索导航站点...'.split(''))

function onSearch() {
  emit('search', query.value)
}

function onSettings() {
  emit('settings')
}
</script>

<style scoped>
.header-left {
  display: flex;
  align-items: center;
}

.header-center {
  flex: 1;
  display: flex;
  justify-content: center;
  max-width: 300px;
  margin: 0 auto;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* ===== 搜索框毛玻璃背景 ===== */
.search-glass {
  width: 100%;
  padding: 6px 16px;
  background: rgba(255, 255, 255, 0.38);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 14px;
  box-shadow:
    inset 0 1px 3px rgba(255, 255, 255, 0.5),
    0 2px 10px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}

.search-glass:focus-within {
  background: rgba(255, 255, 255, 0.55);
  border-color: color-mix(in srgb, var(--nav-primary), transparent 65%);
  box-shadow:
    inset 0 1px 3px rgba(255, 255, 255, 0.6),
    0 4px 18px color-mix(in srgb, var(--nav-primary), transparent 88%);
}

/* ===== 搜索框波浪标签 ===== */
.form-control {
  position: relative;
  width: 100%;
}

.form-control input {
  background-color: transparent;
  border: 0;
  border-bottom: 2px solid rgba(180, 190, 205, 0.5);
  display: block;
  width: 100%;
  padding: 12px 0 6px;
  font-size: 16px;
  color: var(--text-color);
  transition: border-color 0.3s ease;
}

.form-control input:focus {
  outline: 0;
}

.form-control input:focus,
.form-control input.filled {
  border-bottom-color: #7d4cd1;
}

.form-control label {
  position: absolute;
  top: 10px;
  left: 0;
  pointer-events: none;
}

.form-control label span {
  display: inline-block;
  font-size: 16px;
  min-width: 5px;
  color: #8b9eb0;
  transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.form-control input:focus + label span,
.form-control input.filled + label span {
  color: #7d4cd1;
  transform: translateY(-24px);
}

/* ===== 暗色模式 ===== */
html.dark .form-control input {
  color: #c8d6e5;
  border-bottom-color: rgba(255, 255, 255, 0.15);
}

html.dark .form-control input:focus,
html.dark .form-control input.filled {
  border-bottom-color: #b98eff;
}

html.dark .form-control label span {
  color: #6b7d90;
}

html.dark .form-control input:focus + label span,
html.dark .form-control input.filled + label span {
  color: #b98eff;
}

html.dark .search-glass {
  background: rgba(30, 33, 40, 0.45);
  border-color: rgba(255, 255, 255, 0.08);
  box-shadow:
    inset 0 1px 3px rgba(255, 255, 255, 0.03),
    0 2px 10px rgba(0, 0, 0, 0.15);
}

html.dark .search-glass:focus-within {
  background: rgba(30, 33, 40, 0.6);
  border-color: rgba(184, 142, 255, 0.2);
  box-shadow:
    inset 0 1px 3px rgba(255, 255, 255, 0.04),
    0 4px 18px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .header-center {
    max-width: 180px;
  }

  .form-control input {
    font-size: 14px;
  }

  .form-control label span {
    font-size: 14px;
  }

  .form-control input:focus + label span,
  .form-control input.filled + label span {
    transform: translateY(-20px);
  }
}

@media (max-width: 480px) {
  .header-center {
    max-width: 140px;
  }

  .form-control input {
    font-size: 13px;
  }

  .form-control label span {
    font-size: 13px;
  }
}

/* ===== 设置按钮 ===== */
.settings-btn {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.75);
  background: rgba(255, 255, 255, 0.38);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow:
    inset 1px 1px 4px rgba(255, 255, 255, 0.7),
    inset -1px -1px 4px rgba(0, 0, 0, 0.04),
    0 2px 10px rgba(0, 0, 0, 0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #6e6e73;
  transition:
    transform 0.3s cubic-bezier(0.22, 0.61, 0.36, 1),
    box-shadow 0.3s ease,
    color 0.3s ease,
    background 0.3s ease;
  flex-shrink: 0;
}

.settings-btn:hover {
  color: var(--nav-primary);
  background: rgba(255, 255, 255, 0.55);
  transform: translateY(-2px);
  box-shadow:
    inset 1px 1px 4px rgba(255, 255, 255, 0.8),
    inset -1px -1px 4px rgba(0, 0, 0, 0.02),
    0 6px 20px color-mix(in srgb, var(--nav-primary), transparent 82%);
}

.settings-btn:active {
  transform: translateY(0) scale(0.94);
}

html.dark .settings-btn {
  background: rgba(30, 33, 40, 0.5);
  border-color: rgba(255, 255, 255, 0.1);
  color: #8899aa;
  box-shadow:
    inset 1px 1px 3px rgba(255, 255, 255, 0.05),
    inset -1px -1px 4px rgba(0, 0, 0, 0.2),
    0 2px 10px rgba(0, 0, 0, 0.15);
}

html.dark .settings-btn:hover {
  color: var(--nav-primary);
  background: rgba(30, 33, 40, 0.65);
  box-shadow:
    inset 1px 1px 3px rgba(255, 255, 255, 0.06),
    inset -1px -1px 4px rgba(0, 0, 0, 0.15),
    0 6px 20px rgba(0, 0, 0, 0.25);
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
