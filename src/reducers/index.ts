import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { i18nReducer } from 'react-redux-i18n'
// import { reducer as toastrReducer } from 'react-redux-toastr'

import { ui } from './ui.reducer'
import { auth } from './auth.reducer'
import { users } from './users.reducer'
import { albums } from './albums.reducer'

import { IScreenDimensions } from '../helpers'
import { IAuthResponseData, IUserProps, IAlbumProps } from '../services'
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
  ui: {
    appTitle?: string
    appName: string
    appDescription: string
    browser: Bowser.Parser.ParsedResult
    dimensions: IScreenDimensions
    fullScreen: boolean
    siderWidth: number
  }
  auth: IAuthResponseData
  users: {
    selected: IReducerSelected<IUserProps>
    list: IReducerList<IUserProps>
  }
  albums: {
    selected: IReducerSelected<IAlbumProps>
    list: IReducerList<IAlbumProps>
  }
  form: {
    login?: any
    userAdd?: any
  }
  i18n: any
}

const rootReducer = combineReducers<IStoreState>({
  ui,
  auth,
  // settings,
  // admin_ui: adminUi,
  // admin_header: header,
  users,
  // faces,
  albums,
  // front_ui: frontUi,
  // front_albums: frontAlbums,
  form: formReducer,
  // toastr: toastrReducer,
  // trash,
  i18n: i18nReducer,
})

export default rootReducer
export * from './types'
