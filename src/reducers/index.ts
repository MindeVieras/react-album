import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { i18nState } from 'redux-i18n'
// import { reducer as toastrReducer } from 'react-redux-toastr'

import { client } from './client.reducer'
import { auth } from './auth.reducer'
import { users } from './users.reducer'

import { IScreenDimensions } from '../helpers'
import { IAuthResponseData } from '../services'
import { IReducerSelected, IReducerList } from './types'

// import { settings } from './settings.reducer'
// import { adminUi } from './Admin/ui.reducer'
// import { faces } from './Admin/faces.reducer'
// import { adminAlbums } from './Admin/albums.reducer'
// import { header } from './Admin/header.reducer'
// import { trash } from './Admin/trash.reducer'

// import { frontUi } from './Front/ui.reducer'
// import { frontAlbums } from './Front/albums.reducer'

export interface IStoreState {
  client: {
    browser: Bowser.Parser.ParsedResult
    dimensions: IScreenDimensions
    fullScreen: boolean
  }
  auth: IAuthResponseData
  users: {
    selected: IReducerSelected<IUserProps>
    list: IReducerList<IUserProps>
  }
  form: {
    login?: any
  }
  i18nState: any
}

const rootReducer = combineReducers<IStoreState>({
  client,
  auth,
  // settings,
  // admin_ui: adminUi,
  // admin_header: header,
  users,
  // faces,
  // admin_albums: adminAlbums,
  // front_ui: frontUi,
  // front_albums: frontAlbums,
  form: formReducer,
  // toastr: toastrReducer,
  // trash,
  i18nState,
})

export default rootReducer
export * from './types'