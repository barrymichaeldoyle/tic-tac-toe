import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { unregister } from 'core'
import Layout from 'layout'
import { GlobalStyles, theme } from 'styles'
import Routes from 'routes'
import { CurrentUserProvider } from 'hooks'

ReactDOM.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <CurrentUserProvider>
          <Layout>
            <Routes />
          </Layout>
        </CurrentUserProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
  document.getElementById('root')
)

unregister()
