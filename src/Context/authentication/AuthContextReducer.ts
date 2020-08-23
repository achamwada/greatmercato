import { Action, Auth, AuthActionTypes } from './model';

export const authContextReducer = (initialState: Auth, action: Action<null>) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN: {
      return { ...initialState, authenticated: true };
    }

    case AuthActionTypes.LOGOUT: {
      return { ...initialState, authenticated: false };
    }

    case AuthActionTypes.LOGIN_STATUS: {
      return initialState;
    }

    default: {
      return initialState;
    }
  }
};
