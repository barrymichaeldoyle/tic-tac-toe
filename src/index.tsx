import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import Routes from 'routes'
import { unregister } from 'core'

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
)

unregister()
