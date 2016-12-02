import { createAction } from 'redux-actions';
import { LocalStorage } from 'fetchum';

export const SET_TOKEN = 'SET_TOKEN';
export const setToken = createAction(SET_TOKEN);

export const setAuth = (token) => {
  return (dispatch, getState) => {
    LocalStorage.setToken(token);
    return dispatch(setToken(token));
  };
};
