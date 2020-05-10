import React, { FC, useState } from 'react'

import { Button, Error } from 'components'
import { auth } from 'services'

const Logout: FC = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [firebaseErr, setFirebaseErr] = useState<string | undefined>(undefined)

  function handleClick() {
    setIsLoggingOut(true)
    setFirebaseErr(undefined)

    auth
      .signOut()
      .then(() => setIsLoggingOut(false))
      .catch((err) => {
        setFirebaseErr(err.message)
        setIsLoggingOut(false)
      })
  }

  return (
    <>
      <Button disabled={isLoggingOut} onClick={handleClick}>
        Log{isLoggingOut ? 'ging' : ''} Out
      </Button>
      {firebaseErr && <Error>{firebaseErr}</Error>}
    </>
  )
}

export default Logout
