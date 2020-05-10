import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { db } from 'services'
import { SYMBOL } from 'typings'

interface Output {
  clearBoard: (startingTurn: SYMBOL) => void
  isClearing: boolean
}

const useClearBoard = (): Output => {
  const { roomId } = useParams()
  const [isClearing, setIsClearing] = useState(false)

  async function clearBoard(startingTurn: SYMBOL) {
    setIsClearing(true)
    try {
      const newStartingTurn = startingTurn === 'X' ? 'O' : 'X'
      await db
        .collection('rooms')
        .doc(roomId)
        .update({
          board: [null, null, null, null, null, null, null, null, null],
          isGameDone: false,
          message: `${newStartingTurn}'s Turn`,
          playerTurn: newStartingTurn,
          startingTurn: newStartingTurn,
          turnNumber: 1,
        })
    } catch (err) {
      console.error(err)
    } finally {
      setIsClearing(false)
    }
  }

  return { clearBoard, isClearing }
}

export default useClearBoard
