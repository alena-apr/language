export interface IUser {
  login: string;
  psw: string;
  email?: string;
  _id?: string;
}

export const USER_STORE_NAME = 'user';
