import defaultState from 'store/defaultState';
import * as ModalActions from 'ModalActions';

export default function modal(state = defaultState.modal, action) {
  switch (action.type) {
  case ModalActions.OPEN_MODAL:
    return action.payload;
  case ModalActions.CLOSE_MODAL:
    return defaultState.modal;
  default:
    return state;
  }
}
