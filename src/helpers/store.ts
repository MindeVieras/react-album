import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from '../reducers'

let enhancer = applyMiddleware(thunkMiddleware)

// Apply redux dev tools middleware only on dev environment.
if (process.env.NODE_ENV === 'development') {
  enhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
}

/**
 * Redux store.
 */
export const store = createStore(rootReducer, enhancer)
