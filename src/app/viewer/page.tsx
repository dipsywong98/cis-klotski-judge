'use client'

import { parseGame } from "@/lib/parse"
import { solve } from "@/lib/solve"
import { Size } from "@/lib/type"
import { useMemo, useState } from "react"

const getColor = (shape: Size) => {
  const [h, w] = shape

  if (h === 1 && w === 1) {
    return 'orange'
  }
  if (h === 2 && w === 2) {
    return 'red'
  }
  if (h === 1) {
    return 'blue'
  }
  return 'green'
}

const board = 'HBBIHJKINJK@AACCAA@@'
// const board = 'HAAIHAAIJBBKJNOKP@@Q'

export default function ViewerPage() {
  const [game, setGame] = useState(() => parseGame(board))
  const solution = useMemo(() => solve(game), [game])
  
  const next = () => {
    const {blockIdx, dirIdx} = solution.shift() ?? {}
    if (blockIdx === undefined || dirIdx === undefined) {
      return
    }
    const dir = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1]
    ]
    const [drow, dcol] = dir[dirIdx]
    game.blocks[blockIdx].position[0] += drow
    game.blocks[blockIdx].position[1] += dcol
    setGame({...game})
  }

  return (
    <div>
      <button onClick={next} disabled={solution.length === 0}>{'>'}</button>
      <div style={{ position: 'relative', width: '400px', height: '500px' }}>
        {game.blocks.map((block, k) => (
          <div
            key={k}
            style={{
              position: 'absolute',
              left: `${block.position[1] * 100}px`,
              top: `${block.position[0] * 100}px`,
              width: `${block.shape[1] * 100}px`,
              height: `${block.shape[0] * 100}px`,
              backgroundColor: getColor(block.shape),
              boxShadow: 'inset 0 0 2px #000',
              fontSize: '40px',
            }}>
              <div style={{margin: '10px'}}>
                {k}
              </div>
            </div>
        ))}
      </div>
    </div>
  )
}