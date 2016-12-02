import { combineReducers } from 'redux';
import token from './TokenReducer';
import currentUser from './CurrentUserReducer';
import errors from './ErrorReducer';
import modal from './ModalReducer';
import friends from './FriendReducer';

const rootReducer = combineReducers({
  token,
  currentUser,
  errors,
  modal,
  friends,
});

export default rootReducer;
