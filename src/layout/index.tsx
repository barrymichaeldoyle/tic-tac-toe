import React, { FC } from 'react'

import { P } from 'components'
import { useCurrentUser } from 'hooks'

import { Card, Content, Title } from './styles'

const Layout: FC = ({ children }) => {
  const currentUser = useCurrentUser()

  return (
    <Content>
      <Title>Tic Tac Toe</Title>
      <Card>
        {currentUser && <P>Logged in as {currentUser.displayName}</P>}
        {children}
      </Card>
    </Content>
  )
}

export default Layout
