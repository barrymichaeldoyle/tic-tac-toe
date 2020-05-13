import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react'

import { useUser } from 'hooks'
import { auth } from 'services'
import { User } from 'typings'

const CurrentUserContext = createContext<User | undefined>(undefined)

export const CurrentUserProvider: FC = ({ children }) => {
  const [userId, setUserId] = useState<string | undefined>(undefined)
  const { user } = useUser(userId)

  auth.onAuthStateChanged((u) => setUserId(u?.uid))

  useEffect(() => {}, [userId])

  return (
    <CurrentUserContext.Provider value={user}>
      {children}
    </CurrentUserContext.Provider>
  )
}

export const useCurrentUser = () => useContext(CurrentUserContext)
