import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate, CanActivateChild {

  constructor(public afsAuth: AngularFireAuth){

  }
  canActivate(){
    let isOk:boolean;
     // verific if user is login or not
     this.afsAuth.authState.subscribe(user => {
      if (user) {
        isOk = true;
        console.log('true');
        console.log(user)
      } else {
        isOk = false;
        console.log('false');
      }
    })
    return isOk;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  
}
