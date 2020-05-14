import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react'

import { auth, db } from 'services'
import { User } from 'typings'

const CurrentUserContext = createContext<User | undefined>(undefined)

export const CurrentUserProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined)

  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged(async (u) => {
      if (u?.uid) {
        const doc = await db.collection('users').doc(u?.uid).get()
        if (doc.exists) return setUser({ ...doc.data(), id: doc.id } as User)
      }
      return setUser(undefined)
    })
    return () => {
      unsuscribe()
    }
  }, [])

  return (
    <CurrentUserContext.Provider value={user}>
      {children}
    </CurrentUserContext.Provider>
  )
}

export const useCurrentUser = () => useContext(CurrentUserContext)
