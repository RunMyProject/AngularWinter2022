/*
  *************************************
  * AngularWinter2022                 *
  * for Angular 13.1                  *
  * @Jan / 2022 - by Edoardo Sabatini *
  *************************************
*/
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthcanactivateService implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {
    }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      // authorised so return true
      //
      return true;
    }

    // not logged in so redirect to login page with the return url
    //
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});

    return false;
 }
}
