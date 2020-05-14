import React, { FC, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { Button, Error, H1, Field } from 'components'
import { validateEmail, getSearchParams } from 'helpers'
import { useCurrentUser } from 'hooks'
import { auth } from 'services'

const LoginPage: FC = () => {
  const history = useHistory()
  const user = useCurrentUser()
  const [email, setEmail] = useState('')
  const [emailErr, setEmailErr] = useState<string | undefined>()
  const [password, setPassword] = useState('')
  const [passwordErr, setPasswordErr] = useState<string | undefined>()
  const [firebaseErr, setFirebaseErr] = useState<string | undefined>()
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  // Combine this into it's own Hook
  const { search } = useLocation()
  const { redirect, player } = getSearchParams(search)

  useEffect(() => {
    if (user) history.push('/')
  }, [history, user])

  useEffect(() => {
    setEmailErr(undefined)
    setPasswordErr(undefined)
  }, [email, password])

  async function handleLogin() {
    if (email.length === 0) return setEmailErr('Email is required!')
    if (!validateEmail(email)) return setEmailErr('Email must be valid!')
    if (password.length === 0) return setPasswordErr('Password is required!')

    setIsLoggingIn(true)

    try {
      await auth.signInWithEmailAndPassword(email, password)
      // TODO: if redirect doesn't exist, just go to /
      // If  player doesn't exist go to /${redirect}
      return history.push(`/${redirect}?player=${player}`)
    } catch (err) {
      setFirebaseErr(err.message)
      setIsLoggingIn(false)
    }
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
      {firebaseErr && <Error>{firebaseErr}</Error>}
      <Button disabled={isLoggingIn} onClick={handleLogin}>
        Log{isLoggingIn ? 'ging' : ''} In
      </Button>
      <Button onClick={goToSignup}>Signup Instead</Button>
      <Button onClick={goBack}>Back To Home</Button>
    </>
  )
}

export default LoginPage
