import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'

import { Button, H1 } from 'components'

const Home: FC = () => {
  const history = useHistory()

  function handleClick() {
    history.push('/room/AAAA')
  }

  return (
    <>
      <H1>Home Page</H1>
      <Button onClick={handleClick}>Go to Game Room</Button>
    </>
  )
}

export default Home
