import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'

import { RoomItem } from 'typings'

import { Container } from './styles'

const Room: FC<RoomItem> = ({ id, owner }) => {
  const history = useHistory()

  function handleClick() {
    history.push(`/r/${id}`)
  }

  return (
    <Container key={id} onClick={handleClick}>
      {id} = {owner}
    </Container>
  )
}

export default Room
