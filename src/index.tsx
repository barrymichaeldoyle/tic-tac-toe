import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'

import App from 'App'
import { unregister } from 'core'

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
)

unregister()
