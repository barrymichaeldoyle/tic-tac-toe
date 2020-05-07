import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'

const Home = lazy(() => import('pages/home'))
const Room = lazy(() => import('pages/room'))

const Routes = () => (
  <Switch>
    <Suspense fallback={<h1>Loading Page...</h1>}>
      <Route path="/room/:roomId" component={Room} />
      <Route exact path="/" component={Home} />
    </Suspense>
  </Switch>
)

export default Routes
