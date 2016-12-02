import { createAction } from 'redux-actions';
import { getCurrentUser, setCurrentUser, logoutUser } from 'CurrentUserActions';
import { setAuth } from 'TokenActions';

export const LOGIN_SESSION = 'LOGIN_SESSION';
export const loginSession = createAction(LOGIN_SESSION);

export const LOGOUT_SESSION = 'LOGOUT_SESSION';
export const logoutSession = createAction(LOGOUT_SESSION);

export const login = (token) => {
  return [
    loginSession(),
    setAuth(token),
    getCurrentUser(),
  ];
};

export const logout = () => {
  return [
    logoutSession(),
    setAuth(''),
    setCurrentUser({}),
    logoutUser(),
  ];
};
