import React from 'react'
import { useHistory } from 'react-router-dom'

import { Button, H1 } from 'components'

import PlayerDisplay from './playerDisplay'

import { useClearBoard, useCurrentUser, useRoom } from 'hooks'

import Platform from './platform'

import { Container } from './styles'

const Room = () => {
  const { clearBoard, isClearing } = useClearBoard()
  const currentUser = useCurrentUser()
  const history = useHistory()
  const { isFetching, room } = useRoom()

  if (isFetching) return <H1>Loading Room...</H1>
  if (!room) return <H1>Room Not Found</H1>

  const { message, startingTurn } = room

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
      <Platform />
      <PlayerDisplay />
      <Button disabled={isClearing} onClick={handleClear}>
        Clear{isClearing ? 'ing' : ''} Board
      </Button>
      <Button onClick={goBack}>Back To Home</Button>
    </Container>
  )
}

export default Room
