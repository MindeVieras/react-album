import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { i18nReducer } from 'react-redux-i18n'

import { ui } from './ui.reducer'
import { auth } from './auth.reducer'
import { users } from './users.reducer'
import { albums } from './albums.reducer'

import { IScreenDimensions } from '../helpers'
import { IAuthResponseData, IUserProps, IAlbumProps } from '../services'
import { IReducerSelected, IReducerList } from './types'

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
  users,
  albums,
  form: formReducer,
  i18n: i18nReducer,
})

export default rootReducer
export * from './types'
