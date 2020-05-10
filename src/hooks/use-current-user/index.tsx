import React, { createContext, FC, useContext, useState } from 'react'

import { auth } from 'services'

const CurrentUserContext = createContext<firebase.User | null>(null)

export const CurrentUserProvider: FC = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null)

  auth.onAuthStateChanged(setUser)

  return (
    <CurrentUserContext.Provider value={user}>
      {children}
    </CurrentUserContext.Provider>
  )
}

export const useCurrentUser = () => useContext(CurrentUserContext)
