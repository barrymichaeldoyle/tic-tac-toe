import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'

import { Button, H1, Logout } from 'components'
import { useCreateRoom, useCurrentUser } from 'hooks'

const Home: FC = () => {
  const history = useHistory()
  const user = useCurrentUser()
  const { createRoom, isCreatingRoom } = useCreateRoom()

  function goToJoinRoom() {
    history.push('/r')
  }

  function goToLogin() {
    history.push('/login')
  }

  function goToProfile() {
    history.push(`/u/${user!.id}`)
  }

  function goToSignup() {
    history.push('/signup')
  }

  async function handleCreateRoom() {
    const roomId = await createRoom()
    history.push(`/r/${roomId}`)
  }

  return (
    <>
      <H1>Home Page</H1>
      <Button onClick={goToJoinRoom}>Join Room</Button>
      {user ? (
        <>
          <Button disabled={isCreatingRoom} onClick={handleCreateRoom}>
            Creat{isCreatingRoom ? 'ing' : 'e'} Room
          </Button>
          <Button onClick={goToProfile}>Profile</Button>
          <Logout />
        </>
      ) : (
        <>
          <Button onClick={goToLogin}>Login</Button>
          <Button onClick={goToSignup}>Signup</Button>
        </>
      )}
    </>
  )
}

export default Home
