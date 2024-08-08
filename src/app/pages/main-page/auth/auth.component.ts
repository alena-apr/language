import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser, USER_STORE_NAME } from '../../../models/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  authForm: FormGroup = new FormGroup({
    login: new FormControl('', [Validators.required]),
    psw: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  httpError: string;
  showHttpError: boolean = false;
  showNote: boolean = false;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router
  ) {}

  onSubmit() {
    const login = this.authForm.get('login')?.value;
    const psw = this.authForm.get('psw')?.value;

    const authUser: IUser = {
      login: login,
      psw: psw,
    };

    // if (this.authForm.controls.psw.errors?.minlength < 6) {
    //   this.showNote = true;
    // }

    this.http
      .post<{ access_token: string; id: string }>(
        'http://localhost:3000/user/login/',
        authUser
      )
      .subscribe(
        (data) => {
          authUser._id = data.id;
          this.userService.setUser(authUser);
          const token: string = data.access_token;
          this.userService.setToken(token);
          this.userService.setToStore(token);

          // console.log('authUser', authUser);
          localStorage.setItem(USER_STORE_NAME, JSON.stringify(authUser.login));

          this.router.navigate(['exercises/start']);
        },
        (err: HttpErrorResponse) => {
          // console.log('err', err);
          this.httpError = err.error.errorText;
          console.log('error text', this.httpError);
          this.showHttpError = true;
          this.showNote = true;
        }
      );

    // this.showNote = true;
    setTimeout(() => {
      this.showNote = false;
      console.log('TIMEOUT');
    }, 6000);
  }
}
