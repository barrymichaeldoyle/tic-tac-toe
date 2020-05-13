import React, { FC } from 'react'
import { H1 } from 'components'
import { useHistory } from 'react-router-dom'

import { useCurrentUser, useJoinRoom, useRoom, useUser } from 'hooks'

const Platform: FC = () => {
  const currentUser = useCurrentUser()
  const history = useHistory()
  const { isJoining, joinRoom } = useJoinRoom()
  const { isFetching, room } = useRoom()
  const { user: playerO } = useUser(room?.playerOId)
  const { user: playerX } = useUser(room?.playerXId)

  if (isFetching) return <H1>Loading Room...</H1>
  if (!room) return <H1>Room Not Found</H1>

  const { playerOId, playerXId } = room

  return (
    <>
      <p>
        <strong>Player X:</strong>&nbsp;
        {playerX ? (
          <span onClick={() => history.push(`/u/${playerXId}`)}>
            {playerX.displayName}
          </span>
        ) : currentUser ? (
          <span onClick={() => joinRoom('X', currentUser.id)}>
            Join{isJoining ? 'ing' : ''}
          </span>
        ) : (
          <span onClick={() => history.push('/login')}>Login to Join</span>
        )}
      </p>
      <p>
        <strong>Player O:</strong>&nbsp;
        {playerO ? (
          <span onClick={() => history.push(`/u/${playerOId}`)}>
            {playerO.displayName}
          </span>
        ) : currentUser ? (
          <span onClick={() => joinRoom('O', currentUser.id)}>
            Join{isJoining ? 'ing' : ''}
          </span>
        ) : (
          <span onClick={() => history.push('/login')}>Login to Join</span>
        )}
      </p>
    </>
  )
}

export default Platform
