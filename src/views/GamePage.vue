<script setup>
import GameBoard from "@/features/game/components/GameBoard.vue";
import GameHeader from "@/features/game/components/GameHeader.vue";
import GameInstructions from "@/features/help/components/GameInstructions.vue";
</script>

<template>
  <div class="container">
    <GameHeader />
    <GameBoard />
  </div>

  <div class="container">
    <GameInstructions />
  </div>
</template>

<style>
.container {
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25), 0 10px 50px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(1rem);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 24px;
  border-radius: 12px;
  margin: 40px 0;
}
</style>
