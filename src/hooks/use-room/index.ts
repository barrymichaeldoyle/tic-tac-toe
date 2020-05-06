import { useEffect, useState } from 'react'

import { db } from 'services'
import { SYMBOL } from 'typings'

interface Room {
  board: Array<SYMBOL | null>
  isGameDone: boolean
  message: string
  playerTurn: SYMBOL
  turnNumber: number
}

interface Output {
  isFetching: boolean
  room?: Room
}

const useRoom = (id: string): Output => {
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [room, setRoom] = useState<Room | undefined>()

  useEffect(() => {
    const unsubscribe = db
      .collection('rooms')
      .doc(id)
      .onSnapshot((doc) => {
        if (doc.exists) setRoom(doc.data() as Room)
        else console.log('Room Not Found')
        setIsFetching(false)
      })

    return () => {
      unsubscribe()
    }
  }, [id])

  return { isFetching, room }
}

export default useRoom
