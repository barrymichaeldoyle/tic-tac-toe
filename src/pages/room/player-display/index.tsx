import React, { FC, MouseEvent, useCallback, useEffect, useMemo } from 'react'
import { H1 } from 'components'
import { useHistory } from 'react-router-dom'

import { P } from 'components'
import {
  useCurrentUser,
  useJoinRoom,
  useLeaveRoom,
  useRoom,
  useSearchParams,
  useUser,
} from 'hooks'
import { SYMBOL } from 'typings'

interface IProps {
  player: SYMBOL
}

const PlayerDisplay: FC<IProps> = ({ player }) => {
  const currentUser = useCurrentUser()
  const history = useHistory()
  const { isJoining, joinRoom } = useJoinRoom()
  const { isLeaving, leaveRoom } = useLeaveRoom()
  const { isFetching, room } = useRoom()
  const { player: playerSearch } = useSearchParams()

  const playerId = useMemo(
    () => (player === 'X' ? room?.playerXId : room?.playerOId),
    [player, room]
  )

  const { user } = useUser(playerId)

  useEffect(() => {
    if (!isFetching && room && !user && currentUser && playerSearch === player)
      joinRoom(player, currentUser.id)
  }, [isFetching, room, user, currentUser, playerSearch, player, joinRoom])

  const renderRemoveUser = useCallback(() => {
    function handleClick(
      e: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>
    ) {
      e.stopPropagation()
      leaveRoom(player)
    }

    if (currentUser?.id === playerId || currentUser?.id === room?.owner)
      return (
        <>
          &nbsp;
          <span onClick={handleClick}>
            {currentUser?.id === playerId
              ? `Leav${isLeaving ? 'ing' : 'e'}`
              : `Kick${isLeaving ? 'ing' : ''}`}
          </span>
        </>
      )

    return null
  }, [currentUser, isLeaving, leaveRoom, player, playerId, room])

  if (isFetching) return <H1>Loading Room...</H1>
  if (!room) return <H1>Room Not Found</H1>

  return (
    <P>
      <strong>Player {player}:</strong>&nbsp;
      {user ? (
        <span onClick={() => history.push(`/u/${playerId}`)}>
          {user.displayName}
          {renderRemoveUser()}
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
