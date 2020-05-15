import { useCallback, useEffect, useState } from 'react'

import { db } from 'services'
import { RoomItem } from 'typings'

interface Output {
  isFetching: boolean
  rooms: RoomItem[]
}

// TODO: add filter
const useRooms = (/* filter */): Output => {
  const [isFetching, setIsFetching] = useState(true)
  const [rooms, setRooms] = useState<RoomItem[]>([])

  async function formatRoomDoc(
    roomDoc: firebase.firestore.QueryDocumentSnapshot<
      firebase.firestore.DocumentData
    >
  ) {
    const userDoc = await db.collection('users').doc(roomDoc.data().owner).get()
    const owner = userDoc.data()?.displayName ?? '<UNKNOWN>'
    return { id: roomDoc.id, owner }
  }

  const getRooms = useCallback(
    async (
      snapshot: firebase.firestore.QuerySnapshot<
        firebase.firestore.DocumentData
      >
    ) => Promise.all(snapshot.docs.map((roomDoc) => formatRoomDoc(roomDoc))),
    []
  )

  useEffect(() => {
    const unsubscribe = db.collection('rooms').onSnapshot((snapshot) => {
      getRooms(snapshot).then((formattedRooms) => {
        setRooms(formattedRooms) // implement Filter here
        if (isFetching) setIsFetching(false)
      })
    })

    return () => {
      unsubscribe()
    }
  }, [getRooms, isFetching])

  return { isFetching, rooms }
}

export default useRooms
