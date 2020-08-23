export enum UserActionTypes {
  CREATE_ACCOUNT = 'CREATE_ACCOUNT',
  UPDATE_BANKING_DETAILS = 'UPDATE_BANKING_DETAILS',
  UPDATE_USER_DETAILS = 'UPDATE_USER_DETAILS'
}

export default interface User {
  id: string;
  firstname: string;
  lastname: string;
  emailaddress: string;
  address?: string;
  postcode?: string;
  sortcode?: string;
  cvv?: number;
  accountnum?: string;
  expirydate?: string;
  password: string;
}
