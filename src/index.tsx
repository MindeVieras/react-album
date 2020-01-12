import React, { FunctionComponent } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import I18n from 'redux-i18n'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import { store, browserLocale } from './helpers'
import App from './App'
import * as serviceWorker from './serviceWorker'

const theme = createMuiTheme({
  palette: {
    type: 'light',
  },
})

/**
 * Album APP
 */
const AlbumApp: FunctionComponent = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <I18n translations={{}} useReducer={true} initialLang={browserLocale()} fallbackLang="en">
        <App />
      </I18n>
    </MuiThemeProvider>
  </Provider>
)

ReactDOM.render(<AlbumApp />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
