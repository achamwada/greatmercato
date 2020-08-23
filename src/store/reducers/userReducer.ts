import User, { UserActionTypes } from '../types/User';
import { UserActions } from '../actions/User';
import uuid from 'uuid';

const initState: User = {
  id: '',
  firstname: '',
  lastname: '',
  emailaddress: '',
  password: ''
};
const userReducer = (initialState = initState, action: UserActions): User => {
  switch (action.type) {
    case UserActionTypes.CREATE_ACCOUNT: {
      action.payload.id = uuid();
      localStorage.setItem('appuser', JSON.stringify(action.payload));
      return action.payload;
    }
    case UserActionTypes.UPDATE_USER_DETAILS: {
      return { ...initState, ...action.payload };
    }

    case UserActionTypes.UPDATE_BANKING_DETAILS: {
      return action.payload;
    }

    default: {
      return initialState;
    }
  }
};

export default userReducer;
