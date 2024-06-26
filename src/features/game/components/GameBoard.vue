<script setup>
import { onMounted } from "vue";
import GridCell from "@/features/game/components/GridCell.vue";
import { createGame } from "@/features/game/composables/createGame";
import WinMessage from "@/features/game/components/WinMessage.vue";
import AppTimer from "@/features/timer/components/AppTimer.vue";
import { useTimer } from "@/features/timer/composables/useTimer";
import AppButton from "@/components/AppButton.vue";
import { cellColors } from "@/features/game/data/cellColors.js";

const { boardState, gameWon, isValidQueen, toggleCell, clearBoard } = createGame();
const { startTimer, stopTimer, resetTimer } = useTimer();

function handleToggleCell(rowIndex, cellIndex) {
  toggleCell(rowIndex, cellIndex);

  if (gameWon.value) {
    stopTimer();
  }
}

function resetGame() {
  clearBoard();
  resetTimer();
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
        :content="cell.content"
        :color="cellColors[cell.section]"
        :invalid="isValidQueen(rowIndex, cellIndex)"
        @click="handleToggleCell(rowIndex, cellIndex)"
      />
    </template>
  </div>
  <WinMessage v-if="gameWon" />
  <AppTimer />
  <AppButton @click="resetGame">Reset Game</AppButton>
  <AppButton @click="clearBoard">Clear Board</AppButton>
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
