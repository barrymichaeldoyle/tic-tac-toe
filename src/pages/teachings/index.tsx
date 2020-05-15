import React, { FC, useEffect, useState } from 'react'

import { H1 } from 'components'
import { db } from 'services'
import { User } from 'typings'

const Teachings: FC = () => {
  const [isFetching, setIsFetching] = useState(true)
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const unsubscribe = db.collection('users').onSnapshot((snapshot) => {
      const updateUsers = snapshot.docs.map(
        (doc) => ({ ...doc.data(), id: doc.id } as User)
      )
      setUsers(updateUsers)
      setIsFetching(false)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  if (isFetching) return <H1>Fetching Users...</H1>

  return (
    <>
      <h1>teachings</h1>
      {users.map((user) => (
        <div>
          {user.id} - {user.displayName} - {user.roomId}
        </div>
      ))}
    </>
  )
}

export default Teachings
