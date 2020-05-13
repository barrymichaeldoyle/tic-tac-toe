import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { db } from 'services'
import { SYMBOL } from 'typings'

interface Output {
  isJoining: boolean
  joinRoom: (userId: string) => void
}

const useJoinRoom = () => {
  const { roomId } = useParams()
  const [isJoining, setIsJoining] = useState(false)

  async function joinRoom(player: SYMBOL, userId: string) {
    setIsJoining(true)
    try {
      await db
        .collection('rooms')
        .doc(roomId)
        .update({
          [player === 'X' ? 'playerXId' : 'playerOId']: userId,
        })
    } catch (err) {
      console.error(err)
    } finally {
      setIsJoining(false)
    }
  }

  return { isJoining, joinRoom }
}

export default useJoinRoom
