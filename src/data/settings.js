import { reactive, watch } from 'vue'

const SETTINGS_KEY = 'navi_app_settings'

const defaultSettings = { // Default settings
  navCardTheme: 'pink', // can be pink, blue, purple, green, orange
  bgTheme: 'default',   // default, ocean, forest, sunset, custom
  bgCustomColors: ['#ff8fa3', '#a2d2ff', '#b98eff'], // custom colors for 3 blobs
  bgImageUrl: '',       // custom background image URL or base64
  bgImageOpacity: 100,  // background image opacity 0-100
  bgImageBlur: 0        // background image blur radius in px
}

function loadSettings() {
  try {
    const saved = localStorage.getItem(SETTINGS_KEY)
    if (saved) {
      return { ...defaultSettings, ...JSON.parse(saved) }
    }
  } catch (e) {
    console.error('Failed to load settings:', e)
  }
  return { ...defaultSettings }
}

export const settings = reactive(loadSettings())

watch(settings, (newVal) => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(newVal))
  } catch (e) {
    console.error('Failed to save settings to localStorage:', e)
    if (e.name === 'QuotaExceededError') {
      alert('存储空间不足：图片过大导致无法保存配置。请尝试使用较小的图片！')
      // Revert bg image to empty to prevent breaking subsequent saves
      settings.bgImageUrl = ''
    }
  }
  applyTheme(newVal.navCardTheme, newVal.bgTheme)
}, { deep: true })

export function applyTheme(navTheme, bgTheme = settings.bgTheme) {
  document.documentElement.setAttribute('data-nav-theme', navTheme)
  document.documentElement.setAttribute('data-bg-theme', bgTheme)

  // Handle custom nav theme color
  if (navTheme.startsWith('#')) {
    document.documentElement.style.setProperty('--nav-primary', navTheme)
    document.documentElement.style.setProperty('--nav-secondary', `color-mix(in srgb, ${navTheme}, white 20%)`)
    document.documentElement.style.setProperty('--nav-hover-shadow', `color-mix(in srgb, ${navTheme}, transparent 75%)`)
    document.documentElement.style.setProperty('--nav-hover-border', `color-mix(in srgb, ${navTheme}, transparent 60%)`)
    document.documentElement.style.setProperty('--nav-after-1', `color-mix(in srgb, ${navTheme}, transparent 88%)`)
    document.documentElement.style.setProperty('--nav-after-2', `color-mix(in srgb, ${navTheme}, transparent 94%)`)
  } else {
    // Reset custom properties
    document.documentElement.style.removeProperty('--nav-primary')
    document.documentElement.style.removeProperty('--nav-secondary')
    document.documentElement.style.removeProperty('--nav-hover-shadow')
    document.documentElement.style.removeProperty('--nav-hover-border')
    document.documentElement.style.removeProperty('--nav-after-1')
    document.documentElement.style.removeProperty('--nav-after-2')
  }

  // Handle custom background theme color
  if (bgTheme === 'custom') {
    const [c1, c2, c3] = settings.bgCustomColors
    document.documentElement.style.setProperty('--blob1-start', c1)
    document.documentElement.style.setProperty('--blob1-end', `color-mix(in srgb, ${c1}, white 20%)`)
    document.documentElement.style.setProperty('--blob2-start', c2)
    document.documentElement.style.setProperty('--blob2-end', `color-mix(in srgb, ${c2}, white 20%)`)
    document.documentElement.style.setProperty('--blob3-start', c3)
    document.documentElement.style.setProperty('--blob3-end', `color-mix(in srgb, ${c3}, white 20%)`)
  } else if (bgTheme.startsWith('#')) {
    // Keep backward compatibility if a single hex was saved previously
    document.documentElement.style.setProperty('--blob1-start', navTheme.startsWith('#') ? navTheme : bgTheme)
    document.documentElement.style.setProperty('--blob1-end', bgTheme)
    document.documentElement.style.setProperty('--blob2-start', `color-mix(in srgb, ${bgTheme}, black 10%)`)
    document.documentElement.style.setProperty('--blob2-end', `color-mix(in srgb, ${bgTheme}, white 10%)`)
    document.documentElement.style.setProperty('--blob3-start', `color-mix(in srgb, ${bgTheme}, white 20%)`)
    document.documentElement.style.setProperty('--blob3-end', `color-mix(in srgb, ${bgTheme}, transparent 30%)`)
  } else {
    document.documentElement.style.removeProperty('--blob1-start')
    document.documentElement.style.removeProperty('--blob1-end')
    document.documentElement.style.removeProperty('--blob2-start')
    document.documentElement.style.removeProperty('--blob2-end')
    document.documentElement.style.removeProperty('--blob3-start')
    document.documentElement.style.removeProperty('--blob3-end')
  }
}

// Initial apply
applyTheme(settings.navCardTheme, settings.bgTheme)
