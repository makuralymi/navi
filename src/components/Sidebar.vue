<template>
  <aside class="app-sidebar" :class="{ open: visible }">
    <div class="sidebar-logo">
      🌸 <span>凉言de导航</span>
    </div>
    
    <div class="radio-container" :style="{ '--total-radio': menuItems.length }">
      <template v-for="(item, index) in menuItems" :key="index">
        <input 
          type="radio" 
          :id="'nav-' + index" 
          name="sidebar-nav" 
          :checked="modelValue === index" 
          @change="$emit('update:modelValue', index)" 
        />
        <label :for="'nav-' + index">
          <span class="icon">{{ item.icon }}</span>
          <span class="text">{{ item.name }}</span>
        </label>
      </template>

      <div class="glider-container">
        <div class="glider" :style="{ transform: `translateY(${modelValue * 100}%)` }"></div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { siteData } from '../data/index.js'

defineProps({
  modelValue: Number,
  visible: Boolean
})
defineEmits(['update:modelValue'])

const menuItems = siteData
</script>

<style scoped>
.radio-container {
  --main-color: var(--primary-color);
  --main-color-opacity: rgba(247, 168, 184, 0.2); 

  display: flex;
  flex-direction: column;
  position: relative;
  padding-left: 0.5rem;
}

.radio-container input {
  cursor: pointer;
  appearance: none;
  display: none;
}

.radio-container .glider-container {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.6) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  width: 1px;
}

.radio-container .glider-container .glider {
  position: relative;
  height: calc(100% / var(--total-radio));
  width: 100%;
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0) 0%,
    var(--main-color) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transition: transform 0.5s cubic-bezier(0.37, 1.95, 0.66, 0.56);
}

.radio-container .glider-container .glider::before {
  content: "";
  position: absolute;
  height: 60%;
  width: 300%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--main-color);
  filter: blur(10px);
}

.radio-container .glider-container .glider::after {
  content: "";
  position: absolute;
  left: 0;
  height: 100%;
  width: 150px;
  background: linear-gradient(
    90deg,
    var(--main-color-opacity) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  pointer-events: none;
}

.radio-container label {
  cursor: pointer;
  padding: 1.2rem;
  position: relative;
  color: var(--text-muted);
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 500;
  z-index: 2;
}

.radio-container label:hover {
  color: var(--text-color);
  transform: translateX(2px);
}

.radio-container input:checked + label {
  color: var(--primary-color);
  font-weight: bold;
}
</style>