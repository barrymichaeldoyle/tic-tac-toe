import React, { FC, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Button, Field } from 'components'
import { useCurrentUser, useUpdateProfile } from 'hooks'
import { User } from 'typings'

const Content: FC<{ user: User }> = ({ user }) => {
  const { userId } = useParams()
  const { isUpdating, updateProfile } = useUpdateProfile(userId)
  const currentUser = useCurrentUser()
  const [displayName, setDisplayName] = useState(user.displayName)

  const isCurrentUser: boolean = useMemo(() => currentUser?.id === userId, [
    currentUser,
    userId,
  ])

  useEffect(() => {
    setDisplayName(user.displayName)
  }, [user])

  function handleUpdate() {
    if (isCurrentUser) updateProfile(displayName)
  }

  return (
    <>
      <Field
        disabled={!isCurrentUser}
        id="display-name"
        label="Display Name"
        onChange={setDisplayName}
        placeholder="Enter Display Name"
        value={displayName}
      />
      {isCurrentUser && (
        <Button disabled={isUpdating} onClick={handleUpdate}>
          Updat{isUpdating ? 'ing' : 'e'}
        </Button>
      )}
    </>
  )
}

export default Content
