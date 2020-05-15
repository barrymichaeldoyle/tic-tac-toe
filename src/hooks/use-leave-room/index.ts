import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { db } from 'services'
import { SYMBOL } from 'typings'

interface Output {
  isLeaving: boolean
  leaveRoom: (player: SYMBOL) => void
}

const useLeavePosition = (): Output => {
  const { roomId } = useParams()
  const [isLeaving, setIsLeaving] = useState(false)

  async function leaveRoom(player: SYMBOL) {
    setIsLeaving(true)
    try {
      await db
        .collection('rooms')
        .doc(roomId)
        .update({
          [player === 'X' ? 'playerXId' : 'playerOId']: null,
        })
    } catch (err) {
      console.error(err)
    } finally {
      setIsLeaving(false)
    }
  }

  return { isLeaving, leaveRoom }
}

export default useLeavePosition
