<template>
  <div class="instructions">
    <h2>How to play</h2>
    <ol>
      <li>
        Your goal is to have exactly one <span class="queen">♕</span> in each row, column,
        and color region.
      </li>
      <li>
        Tap once to place <span class="x">X</span> and tap twice for
        <span class="queen">♕</span>. Use <span class="x">X</span> to mark where
        <span class="queen">♕</span> cannot be placed.
      </li>
      <li>
        Two <span class="queen">♕</span> cannot touch each other, not even diagonally.
      </li>
    </ol>
  </div>
</template>

<style>
.instructions {
  display: none;
  text-align: left;
  margin-bottom: 20px;
}

.instructions h2 {
  font-size: 16px;
  margin: 0 0 10px;
}

.instructions ol {
  padding-left: 20px;
}

.instructions li {
  font-size: 14px;
  margin-bottom: 10px;
}
</style>
