<template>
  <div class="timer">⏱ Time: {{ formattedTime }}</div>
</template>

<script setup>
import { useTimer } from "../composables/useTimer";

const { formattedTime } = useTimer();
</script>

<style scoped>
.timer {
  font-size: 13px;
  margin: 10px 0;
}
</style>
