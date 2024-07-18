import Klotski from 'klotski'

const klotski = new Klotski()

export type Size = [number, number] // rows, columns
export type Position = [number, number] // row, col

export interface Block {
  shape: Size
  position: Position
}

export interface Game {
  blocks: Block[]
  boardSize: Size
  escapePoint: Position
}

const BOARD_WIDTH = 4
const BOARD_HEIGHT = 5

export const parse = (definition: string) => {
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

  const { A, ...rest } = blocks
  const game: Game = {
    blocks: [A, ...Object.values(rest)],
    boardSize: [5, 4],
    escapePoint: [3, 1]
  }
  return game
}

export const solve = (game: Game) => {
  return klotski.solve(game)
}
