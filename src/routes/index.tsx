import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'

import { H1 } from 'components'

const Home = lazy(() => import('pages/home'))
const Room = lazy(() => import('pages/room'))

const Routes = () => (
  <Switch>
    <Suspense fallback={<H1>Loading Page...</H1>}>
      <Route path="/room/:roomId" component={Room} />
      <Route exact path="/" component={Home} />
    </Suspense>
  </Switch>
)

export default Routes
