import defaultState from '../store/defaultState';
import * as Error from '../actions/ErrorActions';
import { collectionToCamel } from '../utils/general';

export default function errors(state = defaultState.errors, action) {
  switch (action.type) {
    case Error.SET_ERRORS:
      return collectionToCamel(action.payload);
    default:
      return state;
  }
}
