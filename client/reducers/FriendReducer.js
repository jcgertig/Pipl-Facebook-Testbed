import defaultState from 'store/defaultState';
import * as FriendActions from 'FriendActions';
import { cloneDeep } from 'lodash';

export default function friends(state = defaultState.friends, action) {
  switch (action.type) {
  case FriendActions.SET_FRIENDS:
    return {
      list: action.payload.data,
      nextLink: action.payload.paging.next,
    };
  case FriendActions.ADD_FRIENDS:
    return {
      list: [...state.list, ...action.payload.data],
      nextLink: action.payload.paging.next,
    };
  case FriendActions.ADD_PIPL_TO_FRIEND:
    const updatedList = cloneDeep(state.list);
    updatedList[action.payload.index].pipl = action.payload.pipl;
    return Object.assign({}, state, { list: updatedList });
  default:
    return state;
  }
}
