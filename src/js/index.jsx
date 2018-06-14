
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import I18n from 'redux-i18n'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import { store } from './_helpers'
import App from './App'

const theme = createMuiTheme()

const AlbumApp = () => (
  <Provider store={ store }>
    <MuiThemeProvider theme={ theme }>
      <CssBaseline />
      <I18n translations={{}} useReducer={ true } initialLang="en">
        <App />
      </I18n>
    </MuiThemeProvider>
  </Provider>
)

render(<AlbumApp />, document.getElementById('root'))
