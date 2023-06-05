import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {

  constructor(
    private router: Router,
  ) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isLoggedIn();
  }


  isLoggedIn(): any {
    const token = localStorage.getItem("token-session");
    if(token) {
      return this.router.navigateByUrl('/');
    }
    else {
      return true;
    }
  }

  getLocalStorage(key: string): string | null {
    return localStorage.getItem(key);
  }
  
}
