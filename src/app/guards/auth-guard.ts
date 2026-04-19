import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService)
  const router = inject(Router)
  const isLoggedIn  = auth.isLoggedIn();
  if(!isLoggedIn){
    router.navigate(['/sign-in'])
  }
  return  isLoggedIn;
};
