import { useEffect, useState } from 'react'

import { db } from 'services'
import { User } from 'typings'

interface Output {
  isFetching: boolean
  user?: User
}

const useUser = (userId?: string): Output => {
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [user, setUser] = useState<User | undefined>()

  useEffect(() => {
    if (userId) {
      const unsubscribe = db
        .collection('users')
        .doc(userId)
        .onSnapshot((doc) => {
          if (doc.exists) setUser({ ...doc.data(), id: userId } as User)
          else console.log('User Not Found')
          if (isFetching) setIsFetching(false)
        })

      return () => {
        unsubscribe()
      }
    }
  }, [userId, isFetching])

  return { isFetching, user }
}

export default useUser
