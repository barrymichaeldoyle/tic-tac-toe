import React, { FC } from 'react'
import { Button, H1 } from 'components'
import RoomList from './room-list'
import { useHistory } from 'react-router-dom'

// TODO Notes:
// FIRST! Make things look fabulous :D ;)
// Create a filter field, the filter string should be passed
// to the useRooms hook filter via firestore.
// BONUS: Implement Highlighter

const RoomsPage: FC = () => {
  const history = useHistory()

  function handleClick() {
    history.push('/')
  }

  return (
    <>
      <H1>Rooms</H1>
      {/* TODO: Create A Filter Component */}
      <RoomList />
      <Button onClick={handleClick}>Back To Home</Button>
    </>
  )
}

export default RoomsPage
