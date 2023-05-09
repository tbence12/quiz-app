import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { InputUserModel } from 'src/models/userModel';

export const adminGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);

  const user = localStorage.getItem('user');

  if(!user) {
    router.navigate(['/login']);
  }

  const parsedUser: InputUserModel = JSON.parse(user as string);

  if(!parsedUser.isAdmin) {
    router.navigate(['/unauthorized']);
  }

  return true;
};
