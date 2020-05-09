import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'

import { H1 } from 'components'

const Home = lazy(() => import('pages/home'))
const Login = lazy(() => import('pages/login'))
const Room = lazy(() => import('pages/room'))
const Signup = lazy(() => import('pages/signup'))

const Routes = () => (
  <Switch>
    <Suspense fallback={<H1>Loading Page...</H1>}>
      <Route path="/room/:roomId" component={Room} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route exact path="/" component={Home} />
    </Suspense>
  </Switch>
)

export default Routes
