import { useState } from 'react'

import { useCurrentUser } from 'hooks'
import { db } from 'services'

function genId(): string {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for (let i = 0; i < 4; i++)
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  return result
}

interface Output {
  createRoom: () => void
  isCreatingRoom: boolean
}

const useCreateRoom = (): Output => {
  const user = useCurrentUser()
  const [isCreatingRoom, setIsCreatingRoom] = useState(false)

  async function createRoom(): Promise<string | undefined> {
    if (!user) return undefined

    setIsCreatingRoom(true)
    let roomId: string | undefined = user.roomId

    try {
      if (roomId) {
        const foundUserRoom = await db.collection('rooms').doc(roomId).get()
        if (foundUserRoom.exists) return roomId
      } else {
        let newIdGenerated = false
        roomId = genId()

        while (!newIdGenerated) {
          const foundRoom = await db.collection('rooms').doc(roomId).get()
          if (foundRoom.exists) roomId = genId()
          else newIdGenerated = true
        }

        await db.collection('users').doc(user.id).update({ roomId })
      }

      const startingTurn = Math.round(Math.random()) ? 'X' : 'O'
      await db
        .collection('rooms')
        .doc(roomId)
        .set({
          board: [null, null, null, null, null, null, null, null, null],
          isGameDone: false,
          message: `${startingTurn}'s Turn`,
          owner: user.id,
          playerTurn: startingTurn,
          startingTurn: startingTurn,
          turnNumber: 1,
        })
    } catch (err) {
      console.error(err)
    } finally {
      setIsCreatingRoom(false)
      return roomId
    }
  }

  return { createRoom, isCreatingRoom }
}

export default useCreateRoom
