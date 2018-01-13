
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as toastrReducer } from 'react-redux-toastr'

import { client } from './client.reducer'
import { auth } from './Login/auth.reducer'
// import { users } from './users.reducer'
import { adminAlbums } from './Admin/albums.reducer'
import { uploader } from './Admin/uploader.reducer'
import { header } from './Admin/header.reducer'
import { footer } from './Admin/footer.reducer'
import { trash } from './Admin/trash.reducer'

import { frontAlbums } from './Front/albums.reducer'

const rootReducer = combineReducers({
  client,
  auth,
  admin_header: header,
  admin_footer: footer,
  // users,
  admin_albums: adminAlbums,
  front_albums: frontAlbums,
  form: formReducer,
  toastr: toastrReducer,
  uploader,
  trash
})

export default rootReducer
