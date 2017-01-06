// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import token from './TokenReducer';
import currentUser from './CurrentUserReducer';
import errors from './ErrorReducer';
import friends from './FriendReducer';

const rootReducer = combineReducers({
  routing,
  token,
  currentUser,
  errors,
  friends,
});

export default rootReducer;
