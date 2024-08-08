import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UrerRestService {
  constructor(private http: HttpClient) {}

  regUser(userData: IUser): Observable<IUser> {
    return this.http.post<IUser>('http://localhost:3000/user', userData);
  }

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>('http://localhost:3000/user');
  }

  getUserById(id: string): Observable<IUser> {
    return this.http.get<IUser>(`http://localhost:3000/user/${id}`);
  }
}
