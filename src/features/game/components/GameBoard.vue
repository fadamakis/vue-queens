<script setup>
import { ref, onMounted } from "vue";
import GridCell from "@/features/game/components/GridCell.vue";
import { useBoard } from "@/features/game/composables/useBoard";
import WinMessage from "@/features/game/components/WinMessage.vue";
import AppTimer from "@/features/timer/components/AppTimer.vue";
import { useTimer } from "@/features/timer/composables/useTimer";
import AppButton from "@/components/AppButton.vue";

const sectionColors = {
  1: "#007B6C",
  2: "#D18B00",
  3: "#C75D00",
  4: "#0044CC",
  5: "#CC0000",
  6: "#CCCC00",
  7: "#008B8B",
  8: "#8B008B",
};

const { boardState, toggleCell, queens, hasPlayerWon } = useBoard();
const { startTimer, stopTimer, resetTimer } = useTimer();

const gameWon = ref(false);

function handleToggleCell(rowIndex, cellIndex) {
  toggleCell(rowIndex, cellIndex);
  gameWon.value = hasPlayerWon.value;

  if (gameWon.value) {
    stopTimer();
  }
}

function resetGame() {
  resetTimer();
  stopTimer();
  boardState.value = boardState.value.map((row) =>
    row.map((cell) => ({ ...cell, content: null }))
  );
  queens.value = [];
  gameWon.value = false;
  startTimer();
}

onMounted(() => {
  startTimer();
});
</script>

<template>
  <div class="game-board">
    <template v-for="(row, rowIndex) in boardState">
      <GridCell
        v-for="(cell, cellIndex) in row"
        :key="`${rowIndex}-${cellIndex}`"
        :cell="cell"
        :style="{ background: sectionColors[cell.section] }"
        :invalid="
          queens.some(
            (queen) => queen.row === rowIndex && queen.col === cellIndex && !queen.valid
          )
        "
        @toggle="handleToggleCell(rowIndex, cellIndex)"
      />
    </template>
  </div>
  <WinMessage v-if="gameWon" />
  <AppTimer v-else />
  <AppButton @click="resetGame">Reset Game</AppButton>
</template>

<style scoped>
.game-board {
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(8, 42px);
  grid-template-rows: repeat(8, 42px);
  border: 1px solid #000;
}
</style>
