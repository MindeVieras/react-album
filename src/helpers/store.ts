import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { setLocale, loadTranslations, syncTranslationWithStore } from 'react-redux-i18n'

import rootReducer from '../reducers'
import { translations } from '../translations'
import { Locale } from './Locale'

let enhancer = applyMiddleware(thunkMiddleware)

// Apply redux dev tools middleware only on dev environment.
if (process.env.NODE_ENV === 'development') {
  enhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
}

/**
 * Redux store.
 */
const reduxStore = createStore(rootReducer, enhancer)

// Initialize react-redux-i18n.
syncTranslationWithStore(reduxStore)
reduxStore.dispatch<any>(loadTranslations(translations))
reduxStore.dispatch<any>(setLocale(Locale.getLocalLanguage()))

export const store = reduxStore
