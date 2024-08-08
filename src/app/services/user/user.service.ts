import { Injectable } from '@angular/core';
import { UrerRestService } from '../rest/user/urer-rest.service';
import { IUser, USER_STORE_NAME } from '../../models/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: IUser;
  private token: string;

  private userBehSubject = new BehaviorSubject<IUser | null>(null);
  readonly userBehSbject$ = this.userBehSubject.asObservable();

  constructor(private userServiceRest: UrerRestService) {}

  //for DB requsts
  regUser(userData: IUser): Observable<IUser> {
    return this.userServiceRest.regUser(userData);
  }

  //for storage
  getUser(): IUser {
    if (this.user) {
      return this.user;
    } else {
      const userFromStore = localStorage.getItem(USER_STORE_NAME);
      const userFromLS = userFromStore ? JSON.parse(userFromStore) : null;

      return userFromLS;
    }
  }

  setUser(user: IUser): void {
    this.user = user;

    this.userBehSubject.next(this.user);
  }

  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }

  setToStore(token: string): void {
    this.token = token;
    localStorage.setItem('user_token', this.token);
  }

  getAllUsers(): Observable<IUser[]> {
    return this.userServiceRest.getAllUsers();
  }

  getUserById(id: string): Observable<IUser> {
    return this.userServiceRest.getUserById(id);
  }
}
