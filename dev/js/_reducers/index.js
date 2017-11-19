import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { authentication } from './authentication.reducer';
import { users, userGetOne } from './users.reducer';
import { upload } from './upload.reducer';
import { header } from './header.reducer';
import { footer } from './footer.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  users,
  selected_user: userGetOne,
  header,
  footer,
  alert,
  form: formReducer,
  upload
});

export default rootReducer;