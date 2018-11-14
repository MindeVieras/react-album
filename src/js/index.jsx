
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import I18n from 'redux-i18n'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import blueGrey from '@material-ui/core/colors/blueGrey'

import { store } from 'Helpers'
import App from './App'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: blueGrey[900],
      header: blueGrey[800]
    }
  }
})

// console.log(theme)
/**
 * Album APP
 */
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
