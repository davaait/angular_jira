// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
// import {map, Observable, take, tap} from 'rxjs';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     return this.authService.user$.pipe(
//       take(1),
//       map((user: FireBaseUser) => !!user),
//       tap((isLogged: boolean) => {
//         if (!isLogged) {
//           console.log('you are not authorized');
//         }
//       }),
//     );
//   }
// }
