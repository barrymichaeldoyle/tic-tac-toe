import React, { FC } from 'react'

import { Card, Content, Title } from './styles'

const Layout: FC = ({ children }) => (
  <Content>
    <Title>Tic Tac Toe</Title>
    <Card>{children}</Card>
  </Content>
)

export default Layout
