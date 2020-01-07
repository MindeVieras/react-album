import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
// import { reducer as toastrReducer } from 'react-redux-toastr'

import { client } from './client.reducer'

import { IScreenDimensions } from '../helpers'

// import { settings } from './settings.reducer'
// import { auth } from './auth.reducer'
// import { adminUi } from './Admin/ui.reducer'
// import { users } from './Admin/users.reducer'
// import { faces } from './Admin/faces.reducer'
// import { adminAlbums } from './Admin/albums.reducer'
// import { header } from './Admin/header.reducer'
// import { trash } from './Admin/trash.reducer'

// import { frontUi } from './Front/ui.reducer'
// import { frontAlbums } from './Front/albums.reducer'

interface IStoreState {
  client: {
    browser: Bowser.Parser.ParsedResult
    dimensions: IScreenDimensions
  }
  form: {
    login?: any
  }
}

const rootReducer = combineReducers<IStoreState>({
  client,
  // settings,
  // auth,
  // admin_ui: adminUi,
  // admin_header: header,
  // users,
  // faces,
  // admin_albums: adminAlbums,
  // front_ui: frontUi,
  // front_albums: frontAlbums,
  form: formReducer,
  // toastr: toastrReducer,
  // trash,
})

export default rootReducer
