import React, { FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Button, H1, Field } from 'components'
import { validateEmail } from 'helpers'

const LoginPage: FC = () => {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [emailErr, setEmailErr] = useState<string | undefined>()
  const [password, setPassword] = useState('')
  const [passwordErr, setPasswordErr] = useState<string | undefined>()

  useEffect(() => {
    setEmailErr(undefined)
    setPasswordErr(undefined)
  }, [email, password])

  function handleLogin() {
    if (email.length === 0) return setEmailErr('Email is required!')
    if (!validateEmail(email)) return setEmailErr('Email must be valid!')
    if (password.length === 0) return setPasswordErr('Password is required!')
  }

  function goToSignup() {
    history.push('/signup')
  }

  function goBack() {
    history.push('/')
  }

  return (
    <>
      <H1>Login</H1>
      <Field
        errMessage={emailErr}
        id="email"
        label="* Email"
        onChange={setEmail}
        placeholder="Enter Email Here"
        type="email"
        value={email}
      />
      <Field
        errMessage={passwordErr}
        id="password"
        label="* Password"
        onChange={setPassword}
        placeholder="Enter Password Here"
        type="password"
        value={password}
      />
      <Button onClick={handleLogin}>Login</Button>
      <Button onClick={goToSignup}>Signup Instead</Button>
      <Button onClick={goBack}>Back To Home</Button>
    </>
  )
}

export default LoginPage
