import React, { FC } from 'react'
import { H1, H3 } from 'components'
import { useHistory } from 'react-router-dom'
import { useRooms } from 'hooks'

const Room: FC = () => {
  const { isFetching, rooms } = useRooms()
  const history = useHistory()

  if (isFetching) return <H1>Fetching Rooms...</H1>
  if (rooms.length === 0) return <H1>No Rooms Found</H1>

  return (
    <div>
      {rooms.map((
        room // REMEMBER TO MAKE THIS INTO IT'S OWN COMPONENT
      ) => (
        <div key={room.id} onClick={() => history.push(`/r/${room.id}`)}>
          <H3>
            {room.id} = {room.owner}
          </H3>
        </div>
      ))}
    </div>
  )
}

export default Room
