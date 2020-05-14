import React, { FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Button, Error as ErrComponent, Field, H1 } from 'components'
import { validateEmail } from 'helpers'
import { useCurrentUser } from 'hooks'
import { auth, db } from 'services'

const SignupPage: FC = () => {
  const history = useHistory()
  const user = useCurrentUser()
  const [email, setEmail] = useState('')
  const [emailErr, setEmailErr] = useState<string | undefined>()
  const [password, setPassword] = useState('')
  const [passwordErr, setPasswordErr] = useState<string | undefined>()
  const [confirmPassword, setConfirmPassword] = useState('')
  const [confirmPasswordErr, setConfirmPasswordErr] = useState<
    string | undefined
  >()
  const [firebaseErr, setFirebaseErr] = useState<string | undefined>()
  const [isSigningUp, setIsSigningUp] = useState(false)

  useEffect(() => {
    if (user) history.push('/')
  }, [history, user])

  useEffect(() => {
    setEmailErr(undefined)
    setPasswordErr(undefined)
    setConfirmPasswordErr(undefined)
    setFirebaseErr(undefined)
  }, [email, password, confirmPassword])

  async function handleSignup() {
    if (email.length === 0) return setEmailErr('Email is required!')
    if (!validateEmail(email)) return setEmailErr('Email must be valid!')
    if (password.length === 0) return setPasswordErr('Password is required!')
    if (password.length < 6)
      return setPasswordErr('Password must be at least 6 characters long!')
    if (confirmPassword.length === 0)
      return setConfirmPasswordErr('Confirm Password is required!')
    if (password !== confirmPassword) {
      setPasswordErr('Passwords must match!')
      return setConfirmPasswordErr('Passwords must match!')
    }

    setIsSigningUp(true)

    try {
      const response = await auth.createUserWithEmailAndPassword(
        email,
        password
      )

      if (!response.user) throw new Error('Something went wrong!')

      await db
        .collection('users')
        .doc(response.user.uid)
        .set({
          displayName: response.user.email?.split('@')[0] ?? '<UNKNOWN>',
        })
      history.push('/')
    } catch (ex) {
      setFirebaseErr(ex.message)
      setIsSigningUp(false)
    }
  }

  function goToLogin() {
    history.push('/login')
  }

  function goBack() {
    history.push('/')
  }

  return (
    <>
      <H1>Signup</H1>
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
      <Field
        errMessage={confirmPasswordErr}
        id="confirm-password"
        label="* Confirm Password"
        onChange={setConfirmPassword}
        placeholder="Enter Password Again Here"
        type="password"
        value={confirmPassword}
      />
      {firebaseErr && <ErrComponent>{firebaseErr}</ErrComponent>}
      <Button disabled={isSigningUp} onClick={handleSignup}>
        Sign{isSigningUp ? 'ing' : ''} Up
      </Button>
      <Button onClick={goToLogin}>Login Instead</Button>
      <Button onClick={goBack}>Back To Home</Button>
    </>
  )
}

export default SignupPage
