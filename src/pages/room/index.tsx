import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { Button, H1 } from 'components'
import { useClearBoard, useCountdown, useMarkBoard, useRoom } from 'hooks'

import { Block, Container, Grid, Row } from './styles'

const Room = () => {
  const { counter, setCounter } = useCountdown(5)
  const { clearBoard, isClearing } = useClearBoard()
  const { isMarking, markBoard } = useMarkBoard()
  const { isFetching, room } = useRoom()
  const history = useHistory()

  useEffect(() => {
    if (counter === 0) console.log('Timer hit 0!')
  }, [counter])

  if (isFetching) return <H1>Loading Room...</H1>
  if (!room) return <h1>Room Not Found</h1>

  const { board, isGameDone, message, startingTurn } = room

  async function handleClick(index: number) {
    if (!isMarking && !board[index] && !isGameDone) {
      await markBoard(index, room!)
      setCounter(10)
    }
  }

  async function handleClear() {
    await clearBoard(startingTurn)
    setCounter(10)
  }

  function goBack() {
    history.push('/')
  }

  return (
    <Container>
      <H1>
        Timer: {counter} second{counter === 1 ? '' : 's'}
      </H1>
      <H1>{message}</H1>
      <Grid marking={isMarking}>
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
      </Grid>
      <Button disabled={isClearing} onClick={handleClear}>
        Clear{isClearing ? 'ing' : ''} Board
      </Button>
      <Button onClick={goBack}>Back To Home</Button>
    </Container>
  )
}

export default Room
