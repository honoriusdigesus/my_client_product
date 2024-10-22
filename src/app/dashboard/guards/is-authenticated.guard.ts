import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {LoginService} from '../../auth/services/login.service';
import {AuthStatus} from '../../auth/interfaces/auth-status.enum';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (loginService.authStatus() == AuthStatus.authenticated) {
    return true;
  }


  if (loginService.authStatus() == AuthStatus.checking) {
    return false;
  }


  router.navigate(['/auth/login']);
  return true;
};
