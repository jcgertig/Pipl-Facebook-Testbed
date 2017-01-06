import { createAction } from 'redux-actions';
import { LocalStorage } from 'fetchum';
import { setErrors } from './ErrorActions';
import { keysToCamel } from '../utils/general';
import Api from '../utils/api';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const setCurrentUser = createAction(SET_CURRENT_USER);

export const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';
export const removeCurrentUser = createAction(REMOVE_CURRENT_USER);

export const CURRENT_USER_IS_LOADING = 'CURRENT_USER_IS_LOADING';
export const currentUserIsLoading = createAction(CURRENT_USER_IS_LOADING);

export const CURRENT_USER_DID_LOGIN = 'CURRENT_USER_DID_LOGIN';
export const currentUserDidLogin = createAction(CURRENT_USER_DID_LOGIN);

export const getCurrentUser = () => (dispatch) => {
  dispatch(currentUserIsLoading());
  Api.getCurrentUser()
    .then(({ data }) => {
      LocalStorage.set('user', keysToCamel(data.user));
      return dispatch(setCurrentUser(keysToCamel(data.user)));
    })
    .catch((res) => {
      console.log('GET currentUser err', res);
      // dispatch(setErrors(res.data.errors));
    });
};

export const logoutUser = () => () => {
  LocalStorage.set('user', '');
  window.location.href = 'http://localhost:3333/logout';
};
