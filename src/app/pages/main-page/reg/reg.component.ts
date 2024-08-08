import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { createPasswordStrengthValidator } from '../../../validators/psw';
import { createEmailValidator } from '../../../validators/email';
import { UserService } from '../../../services/user/user.service';
import { IUser, USER_STORE_NAME } from '../../../models/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { createLoginValidator } from '../../../validators/login';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrl: './reg.component.scss',
})
export class RegComponent implements OnInit {
  regForm: FormGroup = new FormGroup({
    login: new FormControl('', [Validators.required, createLoginValidator()]),
    psw: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      createPasswordStrengthValidator(),
    ]),
    pswRepeat: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      createPasswordStrengthValidator(),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      createEmailValidator(),
    ]),
  });

  isPswSame: boolean = true;
  httpError: string;
  showHttpError: boolean = false;
  showNote: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    const login = this.regForm.get('login')?.value;
    const psw = this.regForm.get('psw')?.value;
    const pswRepeat = this.regForm.get('pswRepeat')?.value;
    const email = this.regForm.get('email')?.value;

    if (this.checkPswSame(psw, pswRepeat)) {
      // console.log('just checking passwords', this.checkPswSame);

      const userData: IUser = {
        login: login,
        psw: psw,
        email: email,
      };

      const authUser: IUser = {
        login: login,
        psw: psw,
      };

      this.userService.regUser(userData).subscribe(
        (data) => {
          localStorage.setItem(USER_STORE_NAME, JSON.stringify(userData.login));
          console.log('userData', userData);
          // this.router.navigate(['exercises/start']);

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

                console.log('authUser', authUser);

                this.router.navigate(['exercises/start']);
              },
              (err: HttpErrorResponse) => {
                console.log('err', err);
                this.httpError = err.error.errorText;
                this.showHttpError = true;
                this.showNote = true;
              }
            );
        },
        (err: HttpErrorResponse) => {
          console.log('err', err);
          this.httpError = err.error.errorText;
          this.showHttpError = true;
          this.showNote = true;
        }
      );

      // this.http
      //   .post<{ access_token: string; id: string }>(
      //     'http://localhost:3000/user/login/',
      //     authUser
      //   )
      //   .subscribe(
      //     (data) => {
      //       authUser._id = data.id;
      //       this.userService.setUser(authUser);
      //       const token: string = data.access_token;
      //       this.userService.setToken(token);
      //       this.userService.setToStore(token);

      //       console.log('authUser', authUser);

      //       this.router.navigate(['exercises/start']);
      //     },
      //     (err: HttpErrorResponse) => {
      //       console.log('err', err);
      //       this.httpError = err.error.errorText;
      //       this.showHttpError = true;
      //     }
      //   );

      setTimeout(() => {
        this.showNote = false;
        console.log('TIMEOUT');
      }, 6000);
    }
  }

  checkPswSame(psw1: string, psw2: string): boolean {
    this.isPswSame = !(psw1 !== psw2);
    console.log('isSamePsw');
    this.showNote = true;

    setTimeout(() => {
      this.showNote = false;
      console.log('TIMEOUT');
    }, 6000);
    return this.isPswSame;
  }
}
