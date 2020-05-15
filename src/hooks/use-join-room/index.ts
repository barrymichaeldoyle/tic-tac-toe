import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { db } from 'services'
import { SYMBOL } from 'typings'

interface Output {
  isJoining: boolean
  joinRoom: (player: SYMBOL, userId: string) => void
}

const useJoinRoom = (): Output => {
  const { roomId } = useParams()
  const [isJoining, setIsJoining] = useState(false)

  async function joinRoom(player: SYMBOL, userId: string) {
    setIsJoining(true)
    try {
      const doc = await db.collection('rooms').doc(roomId).get()
      if (doc.exists) {
        const data = doc.data()
        if (data?.playerOId === userId || data?.playerXId === userId)
          return alert(`You can't join the game more than once!`)
        await db
          .collection('rooms')
          .doc(roomId)
          .update({
            [player === 'X' ? 'playerXId' : 'playerOId']: userId,
          })
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsJoining(false)
    }
  }

  return { isJoining, joinRoom }
}

export default useJoinRoom
