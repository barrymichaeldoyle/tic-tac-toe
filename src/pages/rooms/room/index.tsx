import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'

import { H1 } from 'components'
import { useRooms } from 'hooks'

import { Container } from './styles'

const Room: FC = () => {
  const { isFetching, rooms } = useRooms()
  const history = useHistory()

  if (isFetching) return <H1>Fetching Rooms...</H1>
  if (rooms.length === 0) return <H1>No Rooms Found</H1>

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
