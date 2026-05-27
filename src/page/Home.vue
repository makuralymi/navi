<template>
  <div class="app-container">
    <Header
      :tab="currentTab"
      @navigate="onNavigate"
      @contact="onContact"
      @announce="onAnnounce"
      @search="onSearch"
      @settings="onSettings"
    />

    <!-- 首页：大标题 + 进入按钮 -->
    <section v-if="currentView === 'home'" class="landing">
      <div class="landing-content">
        <h1 class="landing-title">凉言\导航</h1>
        <p class="landing-sub">一个安静而有温度的导航站点</p>
        <button class="landing-btn" @click="onNavigate('announce')">
          <span>进入导航</span>
          <span class="landing-arrow">→</span>
        </button>
      </div>
    </section>

    <!-- 导航页：侧栏 + 内容 -->
    <div v-else class="app-body">
      <button
        class="sidebar-toggle"
        :class="{ open: sidebarOpen }"
        @click="sidebarOpen = !sidebarOpen"
        aria-label="切换侧栏"
      >
        <span></span><span></span><span></span>
      </button>
      <div
        class="sidebar-backdrop"
        :class="{ visible: sidebarOpen }"
        @click="sidebarOpen = false"
      ></div>
      <Sidebar :modelValue="activeIndex" @update:modelValue="onSidebarChange" :visible="sidebarOpen" />
      <Content :activeIndex="activeIndex" :searchQuery="searchQuery" />
    </div>

    <!-- 联系我弹窗 -->
    <Teleport to="body">
      <div v-if="showContact" class="modal-overlay" @click.self="closeContact">
        <div class="modal-card">
          <button class="modal-close" @click="closeContact">×</button>
          <div class="modal-icon">📬</div>
          <h2>联系我</h2>
          <p class="modal-desc">欢迎通过以下方式与我取得联系</p>
          <a :href="'mailto:' + contactEmail" class="modal-email">{{ contactEmail }}</a>
          <button class="modal-copy" @click="copyEmail">复制邮箱地址</button>
          <span v-if="copied" class="modal-toast">已复制到剪贴板</span>
        </div>
      </div>
    </Teleport>

    <!-- 设置弹窗 -->
    <Teleport to="body">
      <div v-if="showSettings" class="modal-overlay" @click.self="closeSettings">
        <div class="modal-card settings-modal">
          <button class="modal-close" @click="closeSettings">×</button>
          <div class="modal-icon">⚙️</div>
          <h2>设置</h2>
          
          <div class="settings-group">
            <h3>个性化主题</h3>
            
            <div class="setting-item">
              <span class="setting-label">导航卡片配色</span>
              <div class="theme-color-picker">
                <button
                  v-for="color in themeColors"
                  :key="color.value"
                  class="color-btn"
                  :class="{ active: settings.navCardTheme === color.value }"
                  :style="{ background: color.gradient }"
                  :title="color.label"
                  @click="settings.navCardTheme = color.value"
                >
                  <span v-if="settings.navCardTheme === color.value" class="check-icon">✓</span>
                </button>
              </div>
            </div>

            <div class="setting-item">
              <span class="setting-label">光雾背景配色</span>
              <div class="theme-color-picker">
                <button
                  v-for="bg in bgThemes"
                  :key="bg.value"
                  class="color-btn"
                  :class="{ active: settings.bgTheme === bg.value }"
                  :style="{ background: bg.gradient }"
                  :title="bg.label"
                  @click="settings.bgTheme = bg.value; settings.bgImageUrl = ''"
                >
                  <span v-if="settings.bgTheme === bg.value && !settings.bgImageUrl" class="check-icon">✓</span>
                </button>
              </div>
            </div>

            <div class="setting-item" style="flex-direction: column; align-items: flex-start;">
              <span class="setting-label" style="margin-bottom: 8px;">自定义背景图 (URL或本地文件)</span>
              <div class="bg-image-input-group">
                <input 
                  type="text" 
                  v-model="bgImageUrlInput" 
                  placeholder="输入图片URL..." 
                  class="bg-url-input"
                />
                <button class="bg-apply-btn" @click="applyBgImage">应用</button>
                
                <label class="bg-file-btn">
                  选择本地文件
                  <input type="file" accept="image/*" @change="onBgFileChange" style="display: none;" />
                </label>
                
                <button v-if="settings.bgImageUrl" class="bg-clear-btn" @click="clearBgImage">清除</button>
              </div>
            </div>

          </div>

          <p class="modal-desc" style="margin-top:20px;font-size:12px;">更多设置项即将上线，所有配置均自动保存在本地</p>
        </div>
      </div>
    </Teleport>

    <!-- 公告弹窗 -->
    <Teleport to="body">
      <div v-if="showAnnounce" class="modal-overlay" @click.self="closeAnnounce">
        <div class="modal-card announce-modal">
          <button class="modal-close" @click="closeAnnounce">×</button>
          <div class="modal-icon">📢</div>
          <h2>公告</h2>
          <div class="announce-list">
            <div
              v-for="(item, index) in announcements"
              :key="index"
              class="announce-item"
            >
              <div class="announce-head">
                <h3 class="announce-title">{{ item.title }}</h3>
                <span class="announce-date">{{ item.date }}</span>
              </div>
              <p class="announce-content">{{ item.content }}</p>
              <div class="announce-tags">
                <span v-for="tag in item.tags" :key="tag" class="announce-tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from '../components/Header.vue'
import Sidebar from '../components/Sidebar.vue'
import Content from '../components/Content.vue'
import { announcements } from '../data/announcements.js'
import { settings } from '../data/settings.js'

const themeColors = [
  { value: 'pink', label: '樱花粉', gradient: 'linear-gradient(135deg, #f7a8b8, #ffb3c6)' },
  { value: 'blue', label: '海天蓝', gradient: 'linear-gradient(135deg, #90e0ef, #caf0f8)' },
  { value: 'purple', label: '罗兰紫', gradient: 'linear-gradient(135deg, #c5a3ff, #e0c3fc)' },
  { value: 'green', label: '薄荷绿', gradient: 'linear-gradient(135deg, #80ed99, #b7e4c7)' },
  { value: 'orange', label: '落日橘', gradient: 'linear-gradient(135deg, #ffb703, #ffd6a5)' }
]

const bgThemes = [
  { value: 'default', label: '默认梦幻粉', gradient: 'radial-gradient(circle, #ffb6c1 0%, #a0c4ff 100%)' },
  { value: 'ocean', label: '深海幽蓝', gradient: 'radial-gradient(circle, #0077b6 0%, #48cae4 100%)' },
  { value: 'forest', label: '森林迷雾', gradient: 'radial-gradient(circle, #2d6a4f 0%, #52b788 100%)' },
  { value: 'sunset', label: '夕阳余晖', gradient: 'radial-gradient(circle, #e85d04 0%, #ffba08 100%)' }
]

const bgImageUrlInput = ref(settings.bgImageUrl)

function applyBgImage() {
  if (bgImageUrlInput.value.trim()) {
    settings.bgImageUrl = bgImageUrlInput.value.trim()
  }
}

function clearBgImage() {
  settings.bgImageUrl = ''
  bgImageUrlInput.value = ''
}

function onBgFileChange(e) {
  const file = e.target.files[0]
  if (!file) return
  
  const reader = new FileReader()
  reader.onload = (event) => {
    const base64 = event.target.result
    settings.bgImageUrl = base64
    bgImageUrlInput.value = base64
  }
  reader.readAsDataURL(file)
}

const currentTab = ref('home')
const currentView = ref('home')
const activeIndex = ref(0)
const sidebarOpen = ref(false)

function onSidebarChange(index) {
  activeIndex.value = index
  sidebarOpen.value = false
}

const showContact = ref(false)
const contactEmail = 'makuraly@hotmail.com'
const copied = ref(false)

const tabToView = { home: 'home', announce: 'nav' }

function onNavigate(tab) {
  currentTab.value = tab
  currentView.value = tabToView[tab] || 'nav'
}

function onContact() {
  showContact.value = true
}

function closeContact() {
  showContact.value = false
  currentTab.value = currentView.value === 'home' ? 'home' : 'announce'
}

function copyEmail() {
  navigator.clipboard.writeText(contactEmail).then(() => {
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  })
}

const searchQuery = ref('')

function onSearch(q) {
  searchQuery.value = q
}

const showSettings = ref(false)

function onSettings() {
  showSettings.value = true
}

function closeSettings() {
  showSettings.value = false
}

const showAnnounce = ref(false)

function onAnnounce() {
  currentTab.value = 'announce'
  showAnnounce.value = true
}

function closeAnnounce() {
  showAnnounce.value = false
  currentTab.value = currentView.value === 'home' ? 'home' : 'announce'
}
</script>

<style scoped>
/* ===== 首页 Landing ===== */
.landing {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.landing-content {
  text-align: center;
  padding: 40px;
}

.landing-title {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 800;
  letter-spacing: 4px;
  background: linear-gradient(135deg, #f7a8b8, #7d4cd1, #51475a);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 16px;
  animation: titleFloat 3s ease-in-out infinite;
}

@keyframes titleFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

.landing-sub {
  font-size: 1.15rem;
  color: #8b9eb0;
  margin-bottom: 48px;
  letter-spacing: 2px;
  font-weight: 400;
}

.landing-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 48px;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 2px;
  color: #fff;
  background: linear-gradient(135deg, #f7a8b8, #e8879e);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 8px 30px rgba(247, 168, 184, 0.35);
  transition:
    transform 0.35s cubic-bezier(0.22, 0.61, 0.36, 1),
    box-shadow 0.35s ease;
}

.landing-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 40px rgba(247, 168, 184, 0.5);
}

.landing-btn:active {
  transform: translateY(-1px) scale(0.98);
}

.landing-arrow {
  font-size: 1.3rem;
  transition: transform 0.3s ease;
}

.landing-btn:hover .landing-arrow {
  transform: translateX(4px);
}

/* ===== 联系我弹窗 ===== */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: overlayIn 0.3s ease;
}

@keyframes overlayIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-card {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  padding: 48px 44px 36px;
  text-align: center;
  position: relative;
  max-width: 420px;
  width: 90%;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.12);
  animation: cardIn 0.45s cubic-bezier(0.22, 0.61, 0.36, 1);
}

@keyframes cardIn {
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.94);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 20px;
  width: 36px;
  height: 36px;
  border: none;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 50%;
  font-size: 1.4rem;
  color: #888;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  line-height: 1;
}

.modal-close:hover {
  background: rgba(0, 0, 0, 0.08);
  color: #333;
}

.modal-icon {
  font-size: 3rem;
  margin-bottom: 16px;
}

.modal-card h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 8px;
}

.modal-desc {
  font-size: 0.95rem;
  color: #8b9eb0;
  margin-bottom: 28px;
  line-height: 1.6;
}

.modal-email {
  display: block;
  font-size: 1.15rem;
  font-weight: 600;
  color: #f7a8b8;
  text-decoration: none;
  margin-bottom: 24px;
  padding: 12px 20px;
  background: rgba(247, 168, 184, 0.08);
  border-radius: 12px;
  transition: all 0.2s ease;
  word-break: break-all;
}

.modal-email:hover {
  background: rgba(247, 168, 184, 0.15);
  color: #e8879e;
}

.modal-copy {
  border: 1px solid rgba(247, 168, 184, 0.3);
  background: transparent;
  color: #f7a8b8;
  padding: 10px 32px;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
}

.modal-copy:hover {
  background: #f7a8b8;
  color: #fff;
}

.modal-toast {
  display: block;
  margin-top: 14px;
  font-size: 0.85rem;
  color: #5cb85c;
  animation: toastIn 0.3s ease;
}

@keyframes toastIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ===== 公告弹窗 ===== */
.announce-modal {
  max-width: 520px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  padding: 48px 44px 28px;
}

.announce-list {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-right: 4px;
}

.announce-list::-webkit-scrollbar {
  width: 4px;
}

.announce-list::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.12);
  border-radius: 4px;
}

.announce-item {
  text-align: left;
  padding: 18px 20px;
  background: rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 14px;
  transition: all 0.25s ease;
}

.announce-item:hover {
  background: rgba(247, 168, 184, 0.04);
  border-color: rgba(247, 168, 184, 0.2);
}

.announce-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
}

.announce-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
  flex: 1;
  min-width: 0;
}

.announce-date {
  font-size: 0.8rem;
  color: #a0aec0;
  white-space: nowrap;
  flex-shrink: 0;
}

.announce-content {
  font-size: 0.9rem;
  color: #6b7d90;
  line-height: 1.7;
  margin: 0 0 12px;
}

.announce-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.announce-tag {
  font-size: 0.75rem;
  padding: 3px 10px;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(247, 168, 184, 0.12), rgba(186, 230, 253, 0.12));
  color: #7d4cd1;
  font-weight: 600;
  letter-spacing: 0.3px;
}

@media (max-width: 768px) {
  .landing-content {
    padding: 24px;
  }

  .landing-title {
    font-size: clamp(2.2rem, 10vw, 4rem);
    letter-spacing: 2px;
  }

  .landing-sub {
    font-size: 1rem;
    margin-bottom: 36px;
    letter-spacing: 1px;
  }

  .landing-btn {
    padding: 14px 36px;
    font-size: 1rem;
    letter-spacing: 1px;
  }

  .modal-card {
    padding: 36px 28px 28px;
    max-width: 340px;
  }

  .modal-card h2 {
    font-size: 1.3rem;
  }

  .modal-email {
    font-size: 1rem;
  }

  .announce-modal {
    padding: 36px 24px 24px;
  }

  .announce-item {
    padding: 14px 16px;
  }
}

@media (max-width: 480px) {
  .landing-title {
    font-size: clamp(1.8rem, 12vw, 3rem);
  }

  .landing-sub {
    font-size: 0.9rem;
    margin-bottom: 28px;
  }

  .landing-btn {
    padding: 12px 28px;
    font-size: 0.95rem;
  }

  .modal-card {
    padding: 28px 20px 24px;
    border-radius: 20px;
  }

  .announce-modal {
    padding: 28px 18px 20px;
    max-height: 85vh;
  }

  .announce-item {
    padding: 12px 14px;
  }

  .announce-title {
    font-size: 0.95rem;
  }

  .announce-content {
    font-size: 0.82rem;
  }
}
</style>
