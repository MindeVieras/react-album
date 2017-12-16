
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as toastrReducer } from 'react-redux-toastr'

import { auth } from './auth.reducer'
import { users } from './users.reducer'
import { albums } from './albums.reducer'
import { uploader } from './uploader.reducer'
import { header } from './header.reducer'
import { footer } from './footer.reducer'

const rootReducer = combineReducers({
  auth,
  users,
  albums,
  header,
  footer,
  uploader,
  form: formReducer,
  toastr: toastrReducer
})

export default rootReducer
