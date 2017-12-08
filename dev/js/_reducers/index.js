
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { auth } from './auth.reducer';
import { users } from './users.reducer';
import { albums } from './albums.reducer';
import { upload } from './upload.reducer';
import { header } from './header.reducer';
import { footer } from './footer.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  auth,
  users,
  albums,
  header,
  footer,
  alert,
  form: formReducer,
  upload
});

export default rootReducer;