import Klotski from 'klotski'

const klotski = new Klotski()

type Size = [number, number] // rows, columns
type Position = [number, number] // row, col

interface Block {
  shape: Size
  position: Position
}

interface Game {
  blocks: Block[]
  boardSize: Size
  escapePoint: Position
}

const BOARD_WIDTH = 4
const BOARD_HEIGHT = 5

const parseToBlocks = (definition: string) => {
  const blocks: Record<string, Block> = {}

  const get = (row: number, col: number) => definition[col + row * BOARD_WIDTH]

  definition.split('').forEach((character, index) => {
    const col = index % BOARD_WIDTH
    const row = Math.floor(index / BOARD_WIDTH)
    if (character in blocks) {
      return
    }
    if (character === '@') {
      return
    }
    if (get(row + 1, col + 1) === character) {
      blocks[character] = {
        shape: [2, 2],
        position: [row, col]
      }
      return
    }
    if (get(row + 1, col) === character) {
      blocks[character] = {
        shape: [2, 1],
        position: [row, col]
      }
      return
    }
    if (get(row, col + 1) === character) {
      blocks[character] = {
        shape: [1, 2],
        position: [row, col]
      }
      return
    }
    blocks[character] = {
      shape: [1, 1],
      position: [row, col]
    }
    return
  })

  return blocks
}

const solve = (blocks: Record<string, Block>) => {
  const {A, ...rest} = blocks
  const game: Game = {
    blocks: [A, ...Object.values(rest)],
    boardSize: [5, 4],
    escapePoint: [3, 1]
  }

  // var game = {
  //   blocks: [
  //     { "shape": [2, 2], "position": [0, 1] },
  //     { "shape": [2, 1], "position": [0, 0] },
  //     { "shape": [2, 1], "position": [0, 3] },
  //     { "shape": [2, 1], "position": [2, 0] },
  //     { "shape": [2, 1], "position": [2, 3] },
  //     { "shape": [1, 2], "position": [2, 1] },
  //     { "shape": [1, 1], "position": [3, 1] },
  //     { "shape": [1, 1], "position": [3, 2] },
  //     { "shape": [1, 1], "position": [4, 0] },
  //     { "shape": [1, 1], "position": [4, 3] },
  //   ],
  //   boardSize: [6, 6],
  //   escapePoint: [2, 4],
  // };

  return klotski.solve(game)
}

const blocks = parseToBlocks('HAAIHAAIJBBKJNOKP@@Q')
console.log(blocks)
const result = solve(blocks)

console.log(result)
