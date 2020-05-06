import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'

const Home: FC = () => {
  const history = useHistory()

  function handleClick() {
    history.push('/room/AAAA')
  }

  return (
    <>
      <h1>Home Page</h1>
      <button onClick={handleClick}>Go to Game Room</button>
    </>
  )
}

export default Home
