import { ref, computed } from 'vue'
import { sectionGrid } from '@/features/game/data/sectionGrid'

function createBoard() {
  return sectionGrid.map((row) =>
    row.map((section) => ({
      content: null,
      section
    }))
  )
}

export function createGame() {
  const boardState = ref(createBoard())
  const queens = ref([])

  function resetValidations() {
    queens.value.forEach((queen) => (queen.valid = true))
  }

  function validateRow(rowIndex) {
    const queensInRow = queens.value.filter((queen) => queen.row === rowIndex)

    if (queensInRow.length > 1) {
      queensInRow.forEach((queen) => (queen.valid = false))
      return false
    }
    return true
  }

  function validateColumn(columnIndex) {
    const queensInColumn = queens.value.filter((queen) => queen.col === columnIndex)

    if (queensInColumn.length > 1) {
      queensInColumn.forEach((queen) => (queen.valid = false))
      return false
    }
    return true
  }

  function validateSection(section) {
    const queensInSection = queens.value.filter((queen) => {
      const { row, col } = queen
      return boardState.value[row][col].section === section
    })

    if (queensInSection.length > 1) {
      queensInSection.forEach((queen) => (queen.valid = false))
      return false
    }
    return true
  }
  function checkDiagonalConflicts(queen) {
    const directions = [
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1]
    ]

    let conflicts = false

    const { row: rowIndex, col: colIndex } = queen
    for (const [dx, dy] of directions) {
      const newRow = rowIndex + dx
      const newCol = colIndex + dy
      if (
        newRow >= 0 &&
        newRow < boardState.value.length &&
        newCol >= 0 &&
        newCol < boardState.value[0].length
      ) {
        const adjacentQueen = queens.value.find((q) => q.row === newRow && q.col === newCol)
        if (adjacentQueen) {
          queen.valid = false
          adjacentQueen.valid = false
          conflicts = true
        }
      }
    }

    return !conflicts
  }

  function validateBoard() {
    resetValidations()

    for (const queen of queens.value) {
      const { row, col } = queen
      const cell = boardState.value[row][col]
      const rowValid = validateRow(row)
      const colValid = validateColumn(col)
      const sectionValid = validateSection(cell.section)
      const diagonalValid = checkDiagonalConflicts(queen)

      if (!rowValid || !colValid || !sectionValid || !diagonalValid) {
        queen.valid = false
      }
    }
  }

  function isValidQueen(rowIndex, cellIndex) {
    return queens.value.some(
      (queen) => queen.row === rowIndex && queen.col === cellIndex && !queen.valid
    )
  }
  function toggleCell(rowIndex, cellIndex) {
    const cell = boardState.value[rowIndex][cellIndex]

    if (!cell.content) {
      cell.content = 'marked'
    } else if (cell.content === 'marked') {
      cell.content = 'queen'
      queens.value.push({ row: rowIndex, col: cellIndex, valid: true })
    } else {
      queens.value = queens.value.filter(
        (queen) => queen.row !== rowIndex || queen.col !== cellIndex
      )
      cell.content = null
    }

    validateBoard()
  }

  function clearBoard() {
    boardState.value = boardState.value.map((row) =>
      row.map((cell) => ({ ...cell, content: null }))
    )
    queens.value = []
  }

  const gameWon = computed(() => {
    if (queens.value.length !== sectionGrid.length) {
      return false
    }

    return queens.value.every((queen) => queen.valid)
  })

  return {
    boardState,
    toggleCell,
    queens,
    isValidQueen,
    clearBoard,
    gameWon
  }
}
