/** @flow */
import defaultState from 'store/defaultState';
import * as Token from 'TokenActions';

export default function token(state = defaultState.token, action) {
  switch (action.type) {
  case Token.SET_TOKEN:
    return action.payload;
  default:
    return state;
  }
}
