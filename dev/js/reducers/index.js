import {combineReducers} from 'redux';
import PageReducer from './reducer-page';
import ActivePageReducer from './reducer-active-page';

/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const allReducers = combineReducers({
    page: PageReducer,
    activePage: ActivePageReducer
});

export default allReducers
