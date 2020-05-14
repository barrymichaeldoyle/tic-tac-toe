import React, { FC, useEffect, useMemo } from 'react'
import { H1 } from 'components'
import { useHistory, useLocation } from 'react-router-dom'

import { P } from 'components'
import { getSearchParams } from 'helpers'
import { useCurrentUser, useJoinRoom, useRoom, useUser } from 'hooks'
import { SYMBOL } from 'typings'

interface IProps {
  player: SYMBOL
}

const PlayerDisplay: FC<IProps> = ({ player }) => {
  const currentUser = useCurrentUser()
  const history = useHistory()
  const { isJoining, joinRoom } = useJoinRoom()
  const { isFetching, room } = useRoom()

  // Combine this into it's own Hook
  const { search } = useLocation()
  const { player: playerSearch } = getSearchParams(search)

  const playerId = useMemo(
    () => (player === 'X' ? room?.playerXId : room?.playerOId),
    [player, room]
  )

  const { user } = useUser(playerId)

  useEffect(() => {
    if (!isFetching && room && !user && currentUser && playerSearch === player)
      joinRoom(player, currentUser.id)
  }, [isFetching, room, user, currentUser, playerSearch, player, joinRoom])

  if (isFetching) return <H1>Loading Room...</H1>
  if (!room) return <H1>Room Not Found</H1>

  return (
    <P>
      <strong>Player {player}:</strong>&nbsp;
      {user ? (
        <span onClick={() => history.push(`/u/${playerId}`)}>
          {user.displayName}
        </span>
      ) : currentUser ? (
        <span onClick={() => joinRoom(player, currentUser.id)}>
          Join{isJoining ? 'ing' : ''}
        </span>
      ) : (
        <span
          onClick={() =>
            history.push(`/login?redirect=r_${room.id}&player=${player}`)
          }
        >
          Login to Join
        </span>
      )}
    </P>
  )
}

export default PlayerDisplay
