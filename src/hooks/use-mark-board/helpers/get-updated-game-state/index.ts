import { BLOCK, SYMBOL } from 'typings'
import checkBoard from './check-board'

interface Input {
  board: BLOCK[]
  boardIndex: number
  playerTurn: SYMBOL
  turnNumber: number
}

interface Output {
  newBoard: BLOCK[]
  newMessage: string
  newIsGameDone: boolean
  newPlayerTurn: SYMBOL
  newTurnNumber: number
}

export default function getUpdatedGameState({
  board,
  boardIndex,
  playerTurn,
  turnNumber,
}: Input): Output {
  const newBoard = [...board]
  newBoard[boardIndex] = playerTurn
  const outcome = checkBoard({ newBoard, playerTurn, turnNumber })

  let newMessage = ''
  let newIsGameDone = false

  switch (outcome) {
    case 'XWIN': {
      newMessage = 'X WINS!'
      newIsGameDone = true
      break
    }
    case 'OWIN': {
      newMessage = 'O WINS!'
      newIsGameDone = true
      break
    }
    case 'DRAW': {
      newMessage = 'DRAW!'
      newIsGameDone = true
      break
    }
    case 'NONE':
    default:
      newMessage = `${playerTurn === 'X' ? 'O' : 'X'}'s Turn`
  }

  return {
    newBoard,
    newMessage,
    newIsGameDone,
    newPlayerTurn: playerTurn === 'X' ? 'O' : 'X',
    newTurnNumber: turnNumber + 1,
  }
}
