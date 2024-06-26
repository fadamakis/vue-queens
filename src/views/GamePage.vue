<script setup>
import GameBoard from "@/features/game/components/GameBoard.vue";
import GameHeader from "@/features/game/components/GameHeader.vue";
import GameInstructions from "@/features/help/components/GameInstructions.vue";
import AppSection from "@/components/AppSection.vue";
</script>

<template>
  <AppSection>
    <GameHeader />
    <GameBoard />
  </AppSection>

  <AppSection>
    <GameInstructions />
  </AppSection>
</template>
