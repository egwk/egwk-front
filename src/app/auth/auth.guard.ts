import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.hasPermission(next.routeConfig.path)) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }

  hasPermission(feature: string): boolean {
    return this.authService.loggedIn &&
      (
        this.authService.permissions.filter(item => item === feature).length > 0
        ||
        this.authService.permissions[0] === '*'
      );
  }

}
