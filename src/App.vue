<template>
  <div class="bg-blobs">
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="blob blob-3"></div>
  </div>
  <Home />
</template>

<script setup>
import Home from './page/Home.vue'
</script>

<style scoped>
.bg-blobs {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px); /* 强烈的虚化以呈现光雾感 */
  opacity: 0.7;
  animation: float 12s infinite cubic-bezier(0.4, 0, 0.2, 1) alternate;
}

.blob-1 {
  top: -10%;
  left: -10%;
  width: 50vw;
  height: 50vw;
  background: radial-gradient(circle, #ffb6c1 0%, #ffc0cb 100%);
  animation-duration: 14s;
}

.blob-2 {
  bottom: -20%;
  right: -10%;
  width: 60vw;
  height: 60vw;
  background: radial-gradient(circle, #a0c4ff 0%, #90e0ef 100%);
  animation-duration: 18s;
  animation-delay: -3s;
}

.blob-3 {
  top: 30%;
  left: 40%;
  width: 40vw;
  height: 40vw;
  background: radial-gradient(circle, #e0c3fc 0%, #c5a3ff 100%);
  animation-duration: 15s;
  animation-delay: -7s;
}

@keyframes float {
  0% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(5vw, -5vh) scale(1.1);
  }
  66% {
    transform: translate(-3vw, 4vh) scale(0.95);
  }
  100% {
    transform: translate(2vw, 2vh) scale(1.05);
  }
}
</style>