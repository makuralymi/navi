import { reactive, watch } from 'vue'

const SETTINGS_KEY = 'navi_app_settings'

const defaultSettings = { // Default settings
  navCardTheme: 'pink' // can be pink, blue, purple, green
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
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(newVal))
  applyTheme(newVal.navCardTheme)
}, { deep: true })

export function applyTheme(theme) {
  document.documentElement.setAttribute('data-nav-theme', theme)
}

// Initial apply
applyTheme(settings.navCardTheme)
