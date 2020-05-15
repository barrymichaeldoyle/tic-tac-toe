import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'

import { H1 } from 'components'

const Home = lazy(() => import('pages/home'))
const Login = lazy(() => import('pages/login'))
const Profile = lazy(() => import('pages/profile'))
const Room = lazy(() => import('pages/room'))
const Rooms = lazy(() => import('pages/rooms'))
const Signup = lazy(() => import('pages/signup'))
const Teachings = lazy(() => import('pages/teachings'))

const Routes = () => (
  <Switch>
    <Suspense fallback={<H1>Loading Page...</H1>}>
      <Route exact path="/teachings" component={Teachings} />
      <Route path="/r/:roomId" component={Room} />
      <Route exact path="/r" component={Rooms} />
      <Route path="/u/:userId" component={Profile} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route exact path="/" component={Home} />
    </Suspense>
  </Switch>
)

export default Routes
