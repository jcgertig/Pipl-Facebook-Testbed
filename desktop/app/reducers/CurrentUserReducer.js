/** @flow */
import defaultState from '../store/defaultState';
import * as CurrentUser from '../actions/CurrentUserActions';

export default function user(state = defaultState.currentUser, action: Object) {
  switch (action.type) {
    case CurrentUser.SET_CURRENT_USER:
      return action.payload;
    case CurrentUser.REMOVE_CURRENT_USER:
      return defaultState.currentUser;
    default:
      return state;
  }
}
