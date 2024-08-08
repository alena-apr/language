import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);

  const user = userService.getUser();
  if (user.login !== 'admin') {
    router.navigate(['exercises/start']);
    return false;
  }
  return true;
};
