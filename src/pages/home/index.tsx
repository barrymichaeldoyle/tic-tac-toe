import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'

import { Button, H1, Logout } from 'components'
import { useUser } from 'hooks'

const Home: FC = () => {
  const history = useHistory()
  const user = useUser()

  function goToGameRoom() {
    history.push('/room/AAAA')
  }

  function goToLogin() {
    history.push('/login')
  }

  function goToSignup() {
    history.push('/signup')
  }

  return (
    <>
      <H1>Home Page</H1>
      <Button onClick={goToGameRoom}>Go to Game Room</Button>
      {user ? (
        <Logout />
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
