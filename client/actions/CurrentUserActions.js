import { createAction } from 'redux-actions';
import { setErrors } from 'ErrorActions';
import { LocalStorage } from 'fetchum';
import { keysToCamel } from 'utils/general';
import Api from 'api';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const setCurrentUser = createAction(SET_CURRENT_USER);

export const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';
export const removeCurrentUser = createAction(REMOVE_CURRENT_USER);

export const CURRENT_USER_IS_LOADING = 'CURRENT_USER_IS_LOADING';
export const currentUserIsLoading = createAction(CURRENT_USER_IS_LOADING);

export const CURRENT_USER_DID_LOGIN = 'CURRENT_USER_DID_LOGIN';
export const currentUserDidLogin = createAction(CURRENT_USER_DID_LOGIN);

export const getCurrentUser = () => {
  return (dispatch, getState) => {
    dispatch(currentUserIsLoading());
    Api.getCurrentUser()
      .then(({ data }) => {
        LocalStorage.set('user', keysToCamel(data.user));
        dispatch(setCurrentUser(keysToCamel(data.user)));
      })
      .catch((res) => {
        dispatch(setErrors(res.data.errors));
      });
  };
};

export const logoutUser = () => {
  return (dispatch, getState) => {
    LocalStorage.set('user', '');
    window.location.href = 'http://localhost:3333/logout';
  };
};
