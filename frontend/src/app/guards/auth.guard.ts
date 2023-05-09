import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);

  if(!localStorage.getItem('user')) {
    router.navigate(['/login']);
  }

  return true;
};
