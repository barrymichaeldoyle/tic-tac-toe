import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'

import { Button, H1, Logout } from 'components'
import { useCurrentUser } from 'hooks'

const Home: FC = () => {
  const history = useHistory()
  const user = useCurrentUser()

  function goToGameRoom() {
    history.push('/room/AAAA')
  }

  function goToLogin() {
    history.push('/login')
  }

  function goToProfile() {
    history.push(`/u/${user!.uid}`)
  }

  function goToSignup() {
    history.push('/signup')
  }

  return (
    <>
      <H1>Home Page</H1>
      <Button onClick={goToGameRoom}>Go to Game Room</Button>
      {user ? (
        <>
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
