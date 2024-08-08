import { Injectable } from '@angular/core';
import { IUser, USER_STORE_NAME } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userStorage: IUser[] = [];

  constructor() {}

  checkUser(user: IUser): boolean {
    let userInStore: IUser = <IUser>{};

    const isUserExists = this.userStorage.find((el) => el.login === user.login);
    const userFromLS = localStorage.getItem(USER_STORE_NAME);

    if (userFromLS) {
      const parseUser = JSON.parse(userFromLS);
      userInStore = parseUser?.login === user.login ? parseUser : null;
    } else if (isUserExists) {
      userInStore = isUserExists;
    }

    return userInStore?.psw === user.psw;
  }

  setUser(user: IUser): void {
    console.log('AuthService USER', user);
    const isUserExists = this.userStorage.find((el) => el.login === user.login);
    if (!isUserExists && user?.login) {
      this.userStorage.push(user);
    }
  }

  isUserExists(user: IUser): boolean {
    const isUserExists = this.userStorage.find((el) => el.login === user.login);
    return !!isUserExists;
  }
}
