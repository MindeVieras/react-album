
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import I18n from 'redux-i18n'

import { store } from './_helpers'
import App from './App'

render(
  <Provider store={store}>
    <I18n translations={{}} useReducer={true} initialLang="en">
      <App />
    </I18n>
  </Provider>,
  document.getElementById('root')
)
