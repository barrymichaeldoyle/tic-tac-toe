import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'

import { useRooms } from 'hooks'

import { Container } from '../styles'

const Room: FC = () => {
  const { rooms } = useRooms()
  const history = useHistory()

  return (
    <>
      {rooms.map((
        room // REMEMBER TO MAKE THIS INTO IT'S OWN COMPONENT
      ) => (
        <Container key={room.id} onClick={() => history.push(`/r/${room.id}`)}>
          {room.id} = {room.owner}
        </Container>
      ))}
    </>
  )
}

export default Room
