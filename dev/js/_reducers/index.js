import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users, userGetOne, userCreation } from './users.reducer';
import { header } from './header.reducer';
import { footer } from './footer.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  userCreation,
  users,
  userGetOne,
  header,
  footer,
  alert
});

export default rootReducer;