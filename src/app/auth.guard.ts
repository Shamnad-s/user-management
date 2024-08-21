import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: AuthService,
    private jwtHelper: JwtHelperService
  ) {}

  // canActivate(): Observable<boolean> {
  //   const token = localStorage.getItem('token');
  //   console.log(token, 'tokentokentoken');

  //   return this.authService.isLoggedIn.pipe(
  //     take(1), // Ensure we only take the first value and complete the subscription
  //     map((isLoggedIn) => {
  //       if (isLoggedIn) {
  //         return true;
  //       } else {
  //         this.router.navigate(['/login']); // Redirect to login if not authenticated
  //         return false;
  //       }
  //     })
  //   );
  // }
  canActivate(
    route: import('@angular/router').ActivatedRouteSnapshot
  ): boolean {
    const token = localStorage.getItem('token');

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const userRole = decodedToken.role;

      if (route.routeConfig?.path === 'user-list' && userRole !== 'Admin') {
        this.router.navigate(['/home']);
        return false;
      }

      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
