<template>
  <!--
  <label class="theme-switch" title="切换昼夜模式">
    <input
      type="checkbox"
      class="theme-switch__checkbox"
      :checked="isDark"
      @change="onToggle"
    />
    <div class="theme-switch__container">
      <div class="theme-switch__clouds"></div>
      <div class="theme-switch__stars-container">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 55" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M135.831 3.00688C135.055 3.85027 134.111 4.29946 133 4.35447C134.111 4.40947 135.055 4.85867 135.831 5.71123C136.607 6.55462 136.996 7.56303 136.996 8.72727C136.996 7.95722 137.172 7.25134 137.525 6.59129C137.886 5.93124 138.372 5.39954 138.98 5.00535C139.598 4.60199 140.268 4.39114 141 4.35447C139.88 4.2903 138.936 3.85027 138.16 3.00688C137.384 2.16348 136.996 1.16425 136.996 0C136.996 1.16425 136.607 2.16348 135.831 3.00688ZM31 23.3545C32.111 23.4095 33.055 23.8587 33.831 24.7112C34.607 25.5546 34.996 26.563 34.996 27.7273C34.996 26.9572 35.172 26.2513 35.525 25.5913C35.886 24.9312 36.372 24.3995 36.98 24.0054C37.598 23.602 38.268 23.3911 39 23.3545C37.88 23.2903 36.936 22.8503 36.16 22.0069C35.384 21.1635 34.996 20.1642 34.996 19C34.996 20.1642 34.607 21.1635 33.831 22.0069C33.055 22.8503 32.111 23.2903 31 23.3545ZM0 36.3545C1.111 36.4095 2.055 36.8587 2.831 37.7112C3.607 38.5546 3.996 39.563 3.996 40.7273C3.996 39.9572 4.172 39.2513 4.525 38.5913C4.886 37.9312 5.372 37.3995 5.98 37.0054C6.598 36.602 7.268 36.3911 8 36.3545C6.88 36.2903 5.936 35.8503 5.16 35.0069C4.384 34.1635 3.996 33.1642 3.996 32C3.996 33.1642 3.607 34.1635 2.831 35.0069C2.055 35.8503 1.111 36.2903 0 36.3545ZM56.831 28.0069C56.055 28.8503 55.111 29.2995 54 29.3545C55.111 29.4095 56.055 29.8587 56.831 30.7112C57.607 31.5546 57.996 32.563 57.996 33.7273C57.996 32.9572 58.172 32.2513 58.525 31.5913C58.886 30.9312 59.372 30.3995 59.98 30.0054C60.598 29.602 61.268 29.3911 62 29.3545C60.88 29.2903 59.936 28.8503 59.16 28.0069C58.384 27.1635 57.996 26.1642 57.996 25C57.996 26.1642 57.607 27.1635 56.831 28.0069ZM94 2.35447C95.111 2.40947 96.055 2.85867 96.831 3.71123C97.607 4.55462 97.996 5.56303 97.996 6.72727C97.996 5.95722 98.172 5.25134 98.525 4.59129C98.886 3.93124 99.372 3.39954 99.98 3.00535C100.598 2.60199 101.268 2.39114 102 2.35447C100.88 2.2903 99.936 1.85027 99.16 1.00688C98.384 0.163482 97.996 -0.835749 97.996 -2C97.996 -0.835749 97.607 0.163482 96.831 1.00688C96.055 1.85027 95.111 2.2903 94 2.35447Z" fill="currentColor"/>
        </svg>
      </div>
      <div class="theme-switch__circle-container">
        <div class="theme-switch__sun-moon-container">
          <div class="theme-switch__moon">
            <div class="theme-switch__spot"></div>
            <div class="theme-switch__spot"></div>
            <div class="theme-switch__spot"></div>
          </div>
        </div>
      </div>
    </div>
  </label>
  -->

  <!-- Minecraft switch made by: csozi | Website: english.csozi.hu -->
  <label class="switch" title="切换昼夜模式">
    <input
      type="checkbox"
      :checked="isDark"
      @change="onToggle"
    />
    <span class="slider"></span>
    <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAQABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAIG/8QAIxAAAgIABQQDAAAAAAAAAAAAAQMCBAAREiExBUFRcROBsf/EABQBAQAAAAAAAAAAAAAAAAAAAAX/xAAWEQADAAAAAAAAAAAAAAAAAAAAEiL/2gAMAwEAAhEDEQA/AMBTp03dNglMVuttjqnKQ2UPOfntkOThbqVVUJ12BKnogZQZpy+Ucc8knwePWJrWqyqEHVmrTahEBqpbBoAH1n635wt3a9mjN1p8X2pw0qVEbKB/CO/c4OphSVP/2Q==" class="off">
    <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAQABADASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAQIEBf/EACMQAAEDAwQDAQEAAAAAAAAAAAQBAgUDESEAEjFBBlFhMkL/xAAUAQEAAAAAAAAAAAAAAAAAAAAF/8QAGBEAAwEBAAAAAAAAAAAAAAAAABIiMUH/2gAMAwEAAhEDEQA/AM+Bg4mS8coRccMOdNG01qVyH/kRvHPKKmMdr8uujPwUTG+NkRpw1AKWCbvHKa2zTGphc9u9p0q+rLqeMl4kSCGkYgtoE0HTahIz3bWGNanPrdyqWzn7p5ibh5CArnkyZNMyVLpK0QSkt2BNXtVX+7ol1wuLJiyaHt+6Kyp//2Q==" class="on">
  </label>
</template>

<script setup>
import { ref } from 'vue'

const isDark = ref(false)

function applyTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}

function onToggle(e) {
  const label = e.target.closest('.switch')
  const rect = label.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2

  // View Transition API
  if (document.startViewTransition) {
    document.documentElement.style.setProperty('--vt-x', cx + 'px')
    document.documentElement.style.setProperty('--vt-y', cy + 'px')
    document.startViewTransition(() => applyTheme())
    return
  }

  // Fallback — soft blur clip-path
  const maxRadius = Math.hypot(
    Math.max(cx, window.innerWidth - cx),
    Math.max(cy, window.innerHeight - cy)
  )

  const overlay = document.createElement('div')
  overlay.style.cssText = `
    position: fixed;
    inset: -40px;
    pointer-events: none;
    z-index: 9998;
    background: ${isDark.value ? '#f5f7fa' : '#1a1d23'};
    clip-path: circle(0 at ${cx}px ${cy}px);
    filter: blur(16px);
    transition: clip-path 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  `
  document.body.appendChild(overlay)

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.style.clipPath = `circle(${maxRadius + 40}px at ${cx}px ${cy}px)`
    })
  })

  setTimeout(() => applyTheme(), 180)
  setTimeout(() => overlay.remove(), 650)
}
</script>

<style scoped>
/* ===== Minecraft switch made by: csozi | Website: english.csozi.hu ===== */
.switch {
  font-size: 17px;
  position: relative;
  display: inline-block;
  width: 4em;
  height: 2em;
}

.switch input {
  opacity: 1;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
}

.off {
  position: absolute;
  height: 2em;
  width: 2em;
  transition: 0.4s;
  image-rendering: pixelated;
  opacity: 1;
}

.on {
  position: absolute;
  height: 2em;
  width: 2em;
  transition: 0.4s;
  image-rendering: pixelated;
  opacity: 0;
}

.switch input:checked + .slider {
  background-color: #ccc;
}

.switch input:focus + .slider {
  box-shadow: 0 0 1px #ccc;
}

.switch input:checked ~ .off {
  transform: translateX(2em);
}

.switch input:checked ~ .on {
  transform: translateX(2em);
  opacity: 1;
}
</style>
