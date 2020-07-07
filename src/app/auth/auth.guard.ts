import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(
      private router: Router,
      private authService: AuthService,
              ) {

  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn) {
      return true;
    }
    this.authService.saveTargetPath(state.url);

    // Navigate to the processLogin page
    this.router.navigate([ '/login' ]);
    return false;
  }

}
