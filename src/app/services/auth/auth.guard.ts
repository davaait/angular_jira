import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable, take, tap} from 'rxjs';
import {AuthService} from "./auth.service";
import {FireBaseUser} from "../types";
import {Routes} from "../../routes";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user$.pipe(
      take(1),
      map((user: FireBaseUser) => !!user),
      tap((isLogged: boolean) => {
        if (!isLogged) {
          console.log('you are not authorized')
          this.router.navigate([Routes.LOGIN])
        }
      }),
    )
  }
}
