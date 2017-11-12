import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users, userCreation } from './users.reducer';
import { header } from './header.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  userCreation,
  users,
  header,
  alert
});

export default rootReducer;