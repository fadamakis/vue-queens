<script setup>
defineProps(["content", "color", "invalid"]);
</script>

<template>
  <div class="cell" :class="{ invalid }" :style="{ backgroundColor: color }">
    <img v-if="content === 'queen'" src="@/assets/crown.png" class="queen" />
    <span v-if="content === 'marked'">×</span>
  </div>
</template>

<style scoped>
.cell {
  font-size: 24px;
  border: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s ease;
}

.cell.invalid {
  border: 3px solid red;
  background-color: #ffcccc;
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  20%,
  60% {
    transform: translateX(-10px);
  }
  40%,
  80% {
    transform: translateX(10px);
  }
}
.queen {
  width: 24px;
  height: 24px;
}
</style>
