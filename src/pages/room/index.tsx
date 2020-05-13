import React from 'react'
import { useHistory } from 'react-router-dom'

import { Button, H1 } from 'components'
import {
  useClearBoard,
  useCurrentUser,
  useJoinRoom,
  useMarkBoard,
  useRoom,
  useUser,
} from 'hooks'

import { Block, Container, Grid, Row } from './styles'

const Room = () => {
  const { clearBoard, isClearing } = useClearBoard()
  const currentUser = useCurrentUser()
  const history = useHistory()
  const { isJoining, joinRoom } = useJoinRoom()
  const { isMarking, markBoard } = useMarkBoard()
  const { isFetching, room } = useRoom()
  const { user: playerO } = useUser(room?.playerOId)
  const { user: playerX } = useUser(room?.playerXId)

  if (isFetching) return <H1>Loading Room...</H1>
  if (!room) return <H1>Room Not Found</H1>

  const {
    board,
    isGameDone,
    message,
    playerOId,
    playerTurn,
    playerXId,
    startingTurn,
  } = room

  async function handleClick(index: number) {
    if (!isMarking && !board[index] && !isGameDone) {
      if (
        (playerTurn === 'X' && currentUser?.id === playerXId) ||
        (playerTurn === 'O' && currentUser?.id === playerOId)
      )
        await markBoard(index, room!)
    }
  }

  async function handleClear() {
    await clearBoard(startingTurn)
  }

  function goBack() {
    history.push('/')
  }

  console.log({ currentUser })

  return (
    <Container>
      {currentUser && <p>Logged in as {currentUser.displayName}</p>}
      <H1>{message}</H1>
      {/* Move this to it's own component */}
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
      {/* TODO: Create PlayerXDisplay & PlayerODisplay (PREFERABLY JUST ONE COMPONENT WITH A PROP TO SAY X OR O) */}
      <p>
        <strong>Player X:</strong>&nbsp;
        {playerX ? (
          <span onClick={() => history.push(`/u/${playerXId}`)}>
            {playerX.displayName}
          </span>
        ) : currentUser ? (
          <span onClick={() => joinRoom('X', currentUser.id)}>
            Join{isJoining ? 'ing' : ''}
          </span>
        ) : (
          <span onClick={() => history.push('/login')}>Login to Join</span>
        )}
      </p>
      <p>
        <strong>Player O:</strong>&nbsp;
        {playerO ? (
          <span onClick={() => history.push(`/u/${playerOId}`)}>
            {playerO.displayName}
          </span>
        ) : currentUser ? (
          <span onClick={() => joinRoom('O', currentUser.id)}>
            Join{isJoining ? 'ing' : ''}
          </span>
        ) : (
          <span onClick={() => history.push('/login')}>Login to Join</span>
        )}
      </p>
      <Button disabled={isClearing} onClick={handleClear}>
        Clear{isClearing ? 'ing' : ''} Board
      </Button>
      <Button onClick={goBack}>Back To Home</Button>
    </Container>
  )
}

export default Room
