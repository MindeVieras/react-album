
import { combineReducers } from 'redux'
import { i18nState } from 'redux-i18n'
import { reducer as formReducer } from 'redux-form'
import { reducer as toastrReducer } from 'react-redux-toastr'

import { client } from './client.reducer'
import { settings } from './settings.reducer'
import { auth } from './Login/auth.reducer'
import { adminUi } from './Admin/ui.reducer'
import { users } from './Admin/users.reducer'
import { adminAlbums } from './Admin/albums.reducer'
import { header } from './Admin/header.reducer'
import { footer } from './Admin/footer.reducer'
import { trash } from './Admin/trash.reducer'

import { frontUi } from './Front/ui.reducer'
import { frontAlbums } from './Front/albums.reducer'

const rootReducer = combineReducers({
  client,
  settings,
  auth,
  admin_ui: adminUi,
  admin_header: header,
  // admin_footer: footer,
  users,
  admin_albums: adminAlbums,
  front_ui: frontUi,
  front_albums: frontAlbums,
  form: formReducer,
  toastr: toastrReducer,
  trash,
  i18nState
})

export default rootReducer
