import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'

import { H1 } from 'components'
import { useRooms } from 'hooks'

// TODO Notes:
// FIRST! Make things look fabulous :D ;)
// Create a filter field, the filter string should be passed
// to the useRooms hook filter via firestore.
// BONUS: Implement Highlighter

const Rooms: FC = () => {
  const history = useHistory() // TODO: move to individual rom component
  const { isFetching, rooms } = useRooms()

  if (isFetching) return <H1>Fetching Rooms...</H1>
  if (rooms.length === 0) return <H1>No Rooms Found</H1> // Add back button

  return (
    <>
      <H1>Rooms</H1>
      {/* TODO: Create A Filter Component */}
      {rooms.map((
        room // REMEMBER TO MAKE THIS INTO IT'S OWN COMPONENT
      ) => (
        <div key={room.id} onClick={() => history.push(`/r/${room.id}`)}>
          {room.id} = {room.owner}
        </div>
      ))}
    </>
    // Add Back Button here too!
  )
}

export default Rooms
