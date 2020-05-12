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
    let output: string | undefined = undefined

    try {
      const userDetails = await db.collection('users').doc(user.uid).get()
      if (userDetails.data()?.roomId) {
        return (output = userDetails.data()?.roomId)
      }

      let newIdGenerated = false
      let randomRoomId = genId()

      while (!newIdGenerated) {
        const foundRoom = await db.collection('rooms').doc(randomRoomId).get()
        if (foundRoom.exists) randomRoomId = genId()
        else newIdGenerated = true
      }

      const startingTurn = Math.round(Math.random()) ? 'X' : 'O'
      await db
        .collection('rooms')
        .doc(randomRoomId)
        .set({
          board: [null, null, null, null, null, null, null, null, null],
          isGameDone: false,
          message: `${startingTurn}'s Turn`,
          owner: user.uid,
          playerTurn: startingTurn,
          startingTurn: startingTurn,
          turnNumber: 1,
        })
      await db
        .collection('users')
        .doc(user.uid)
        .update({ roomId: randomRoomId })

      output = randomRoomId
    } catch (err) {
      console.error(err)
    } finally {
      setIsCreatingRoom(false)
      return output
    }
  }

  return { createRoom, isCreatingRoom }
}

export default useCreateRoom
