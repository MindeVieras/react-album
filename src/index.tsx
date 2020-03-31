import React, { FunctionComponent } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { store } from './helpers'
import App from './App'
import * as serviceWorker from './serviceWorker'

/**
 * Album APP.
 */
const AlbumApp: FunctionComponent = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(<AlbumApp />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
