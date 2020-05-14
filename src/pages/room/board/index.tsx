import React, { FC } from 'react'

import { H1 } from 'components'
import { useCurrentUser, useMarkBoard, useRoom } from 'hooks'

import { Block, Container, Row } from './styles'

const Board: FC = () => {
  const { isMarking, markBoard } = useMarkBoard()
  const { isFetching, room } = useRoom()
  const currentUser = useCurrentUser()

  if (isFetching) return <H1>Loading Room...</H1>
  if (!room) return <H1>Room Not Found</H1>

  const { board, isGameDone, playerOId, playerTurn, playerXId } = room

  async function handleClick(index: number) {
    if (!isMarking && !board[index] && !isGameDone) {
      if (
        (playerTurn === 'X' && currentUser?.id === playerXId) ||
        (playerTurn === 'O' && currentUser?.id === playerOId)
      )
        await markBoard(index, room!)
    }
  }

  return (
    <Container marking={isMarking}>
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
    </Container>
  )
}

export default Board
