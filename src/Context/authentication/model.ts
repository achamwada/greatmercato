import User from '../../store/types/User';
export interface Auth {
  user: User;
  authenticated: boolean;
  loginUser: Function;
  loginOutUser: Function;
  checkLoginStatus: Function;
}

export interface Action<T> {
  type: string;
  payload?: T;
}

export enum AuthActionTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  LOGIN_STATUS = 'LOGIN_STATUS',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD'
}
