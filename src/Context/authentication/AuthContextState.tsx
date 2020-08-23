import React, { useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { AppState } from '../../store/reducers';
import User, { UserActionTypes } from '../../store/types/User';
import AuthContext from './AuthContext';
import { authContextReducer } from './AuthContextReducer';
import { Auth, AuthActionTypes } from './model';
const AuthContextState: React.FC<RouteComponentProps> = ({ history, children }) => {
  const loginUser = (user: User) => {
    const userData = localStorage.getItem('appuser');
    console.log('starting auth...');

    if (typeof userData == 'string') {
      const storedUser: User = JSON.parse(userData);

      if (storedUser.emailaddress === user.emailaddress && storedUser.password === user.password) {
        dispatch({ type: AuthActionTypes.LOGIN });
        reduxDispatch({ type: UserActionTypes.UPDATE_USER_DETAILS, payload: storedUser });
        console.log('Authenticated');
        history.push('/');
      }
    }
  };
  const loginOutUser = () => {
    dispatch({ type: AuthActionTypes.LOGOUT });
    history.push('/login');
  };
  const checkLoginStatus = () => dispatch({ type: AuthActionTypes.LOGIN_STATUS });

  const user = useSelector((state: AppState) => state.user);
  const reduxDispatch = useDispatch();

  const initialState: Auth = {
    user,
    authenticated: false,
    loginUser,
    loginOutUser,
    checkLoginStatus
  };

  const [state, dispatch] = useReducer(authContextReducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        authenticated: state.authenticated,
        loginUser: state.loginUser,
        loginOutUser: state.loginOutUser,
        checkLoginStatus: state.checkLoginStatus
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default withRouter(AuthContextState);
