import User, { UserActionTypes } from '../types/User';
export interface createAccount {
  type: UserActionTypes.CREATE_ACCOUNT;
  payload: User;
}

export interface updateBankDetails {
  type: UserActionTypes.UPDATE_BANKING_DETAILS;
  payload: User;
}

export interface updateUserDetails {
  type: UserActionTypes.UPDATE_USER_DETAILS;
  payload: User;
}

export type UserActions = createAccount | updateBankDetails | updateUserDetails;
