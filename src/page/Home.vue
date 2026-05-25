<template>
  <div class="app-container">
    <Header
      :tab="currentTab"
      @navigate="onNavigate"
      @contact="onContact"
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
      <Sidebar v-model="activeIndex" />
      <Content :activeIndex="activeIndex" />
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
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from '../components/Header.vue'
import Sidebar from '../components/Sidebar.vue'
import Content from '../components/Content.vue'

const currentTab = ref('home')
const currentView = ref('home')
const activeIndex = ref(0)

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
</style>
