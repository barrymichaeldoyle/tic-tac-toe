import React, { FC, ChangeEvent } from 'react'

import { Container, Error, Input, Label } from './styles'

interface IProps {
  errMessage?: string
  id: string
  label: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
  value: string
}

const Field: FC<IProps> = ({ errMessage, id, label, onChange, ...rest }) => {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value)
  }

  return (
    <Container>
      <Label error={errMessage} htmlFor={id}>
        {label}:
      </Label>
      <Input error={errMessage} id={id} onChange={handleChange} {...rest} />
      {errMessage && <Error>{errMessage}</Error>}
    </Container>
  )
}

export default Field
