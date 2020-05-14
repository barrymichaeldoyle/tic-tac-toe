import React, { FC } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { Button, H1, P } from 'components'
import { useUser } from 'hooks'

import Content from './content'

const ProfilePage: FC = () => {
  const history = useHistory()
  const { userId } = useParams()
  const { isFetching, user } = useUser(userId)

  if (isFetching) return <H1>Fetching User Profile...</H1>

  function goBack() {
    history.push('/')
  }

  return (
    <>
      <H1>Profile</H1>
      {user ? (
        <Content user={user} />
      ) : (
        <P>Could not find user with ID: {userId}</P>
      )}
      <Button onClick={goBack}>Back</Button>
    </>
  )
}

export default ProfilePage
