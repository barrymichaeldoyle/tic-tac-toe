import React from 'react'
import { useParams } from 'react-router-dom'

import { checkBoard } from 'helpers'
import { Block, Button, Container, Row } from 'styles'
import { useRoom } from 'hooks'

export type SYMBOL = 'x' | 'o'
export type BLOCK = SYMBOL | '-'

const Room = () => {
  const { id } = useParams()
  const { isFetching, room } = useRoom(id)

  if (isFetching) return <h1>Loading Room...</h1>
  if (!room) return <h1>Room Not Found</h1>

  const { board, isGameDone, message, playerTurn, turnNumber } = room

  function handleClick(index: number) {
    // if (board[index] === '-' && !gameDone) {
    //   const newBoard = [...board]
    //   newBoard[index] = isXTurn ? 'x' : 'o'
    //   const outcome = checkBoard({ newBoard, isXTurn, turnNumber })
    //   switch (outcome) {
    //     case 'XWIN': {
    //       setMessage(`X WINS!`)
    //       setGameDone(true)
    //       break
    //     }
    //     case 'OWIN': {
    //       setMessage(`O WINS!`)
    //       setGameDone(true)
    //       break
    //     }
    //     case 'DRAW': {
    //       setMessage(`DRAW!`)
    //       setGameDone(true)
    //       break
    //     }
    //     case 'NONE':
    //     default:
    //       setMessage(`${isXTurn ? 'O' : 'X'}'s Turn`)
    //   }
    //   setTurnNumber(turnNumber + 1)
    //   setIsXTurn(!isXTurn)
    //   setBoard(newBoard)
    // }
  }

  function handleClear() {
    // setStartingTurn(startingTurn === 'x' ? 'o' : 'x')
    // setIsXTurn(startingTurn === 'x')
    // setMessage(`${startingTurn.toUpperCase()}'s Turn`)
    // setBoard(['-', '-', '-', '-', '-', '-', '-', '-', '-'])
    // setGameDone(false)
    // setTurnNumber(1)
  }

  return (
    <Container>
      <h3>{message}</h3>
      <Row>
        <Block onClick={() => handleClick(0)}>{board[0]}</Block>
        <Block onClick={() => handleClick(1)}>{board[1]}</Block>
        <Block onClick={() => handleClick(2)}>{board[2]}</Block>
      </Row>
      <Row>
        <Block onClick={() => handleClick(3)}>{board[3]}</Block>
        <Block onClick={() => handleClick(4)}>{board[4]}</Block>
        <Block onClick={() => handleClick(5)}>{board[5]}</Block>
      </Row>
      <Row>
        <Block onClick={() => handleClick(6)}>{board[6]}</Block>
        <Block onClick={() => handleClick(7)}>{board[7]}</Block>
        <Block onClick={() => handleClick(8)}>{board[8]}</Block>
      </Row>
      <Button onClick={handleClear}>Clear Board</Button>
    </Container>
  )
}

export default Room
