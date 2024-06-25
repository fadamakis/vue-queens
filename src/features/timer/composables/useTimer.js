import { ref, computed } from 'vue';

const time = ref(0);

export function useTimer() {
  let timerInterval = null;

  const startTimer = () => {
    if (timerInterval) return;
    timerInterval = setInterval(() => {
      time.value++;
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerInterval);
    timerInterval = null;
  };

  const resetTimer = () => {
    time.value = 0;
    stopTimer();
  };

  const formattedTime = computed(() => {
    const minutes = Math.floor(time.value / 60);
    const seconds = time.value % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  });


  return {
    time,
    formattedTime,
    startTimer,
    stopTimer,
    resetTimer,
  };
}