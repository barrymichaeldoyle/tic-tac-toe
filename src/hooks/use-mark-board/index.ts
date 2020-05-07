import { useState } from 'react'

import { db } from 'services'
import { Room } from 'typings'

import { getUpdatedGameState } from './helpers'

interface Output {
  isMarking: boolean
  markBoard: (boardIndex: number, room: Room) => void
}

const useMarkBoard = (roomId: string): Output => {
  const [isMarking, setIsMarking] = useState<boolean>(false)

  async function markBoard(boardIndex: number, room: Room) {
    setIsMarking(true)
    try {
      const { board, playerTurn, turnNumber } = room
      const {
        newBoard,
        newIsGameDone,
        newMessage,
        newPlayerTurn,
        newTurnNumber,
      } = getUpdatedGameState({ board, boardIndex, playerTurn, turnNumber })
      await db.collection('rooms').doc(roomId).update({
        board: newBoard,
        isGameDone: newIsGameDone,
        message: newMessage,
        playerTurn: newPlayerTurn,
        turnNumber: newTurnNumber,
      })
    } catch (err) {
      console.error(err)
    }
    setIsMarking(false)
  }

  return { isMarking, markBoard }
}

export default useMarkBoard
