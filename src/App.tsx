import React, { useState } from 'react'

import { Block, Button, Container, Row } from 'styles'

type SYMBOL = 'x' | 'o'
type BLOCK = SYMBOL | '-'

const App = () => {
  const [board, setBoard] = useState<BLOCK[]>([
    '-',
    '-',
    '-',
    '-',
    '-',
    '-',
    '-',
    '-',
    '-',
  ])
  const [startingTurn, setStartingTurn] = useState<SYMBOL>('x')
  const [isXTurn, setIsXTurn] = useState<boolean>(startingTurn === 'x')

  function handleClick(index: number) {
    if (board[index] === '-') {
      const newBoard = [...board]
      newBoard[index] = isXTurn ? 'x' : 'o'
      setIsXTurn(!isXTurn)
      setBoard(newBoard)
    }
  }

  function handleClear() {
    setStartingTurn(startingTurn === 'x' ? 'o' : 'x')
    setIsXTurn(startingTurn === 'x')
    setBoard(['-', '-', '-', '-', '-', '-', '-', '-', '-'])
  }

  return (
    <Container>
      <p>Players Turn: {isXTurn ? 'X' : 'O'}</p>
      <Row>
        <Block onClick={() => handleClick(0)}>
          {board[0] !== '-' && board[0]}
        </Block>
        <Block onClick={() => handleClick(1)}>
          {board[1] !== '-' && board[1]}
        </Block>
        <Block onClick={() => handleClick(2)}>
          {board[2] !== '-' && board[2]}
        </Block>
      </Row>
      <Row>
        <Block onClick={() => handleClick(3)}>
          {board[3] !== '-' && board[3]}
        </Block>
        <Block onClick={() => handleClick(4)}>
          {board[4] !== '-' && board[4]}
        </Block>
        <Block onClick={() => handleClick(5)}>
          {board[5] !== '-' && board[5]}
        </Block>
      </Row>
      <Row>
        <Block onClick={() => handleClick(6)}>
          {board[6] !== '-' && board[6]}
        </Block>
        <Block onClick={() => handleClick(7)}>
          {board[7] !== '-' && board[7]}
        </Block>
        <Block onClick={() => handleClick(8)}>
          {board[8] !== '-' && board[8]}
        </Block>
      </Row>
      <Button onClick={handleClear}>Clear Board</Button>
    </Container>
  )
}

export default App
