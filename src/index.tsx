import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import { store } from './helpers'
import App from './App'
import * as serviceWorker from './serviceWorker'

const theme = createMuiTheme({
  palette: {
    type: 'light',
  },
})

// console.log(translations)
/**
 * Album APP
 */
const AlbumApp = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </MuiThemeProvider>
  </Provider>
)

ReactDOM.render(<AlbumApp />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
