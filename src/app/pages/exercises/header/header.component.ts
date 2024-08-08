import { Component } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { IUser, USER_STORE_NAME } from '../../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  user: IUser;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

  goToGrammar(): void {
    console.log('goToGrammar');
    this.router.navigate(['exercises/grammar']);
  }

  logOut() {
    localStorage.removeItem(USER_STORE_NAME);
    localStorage.removeItem('user_token');
    this.router.navigate(['main']);
  }
}
