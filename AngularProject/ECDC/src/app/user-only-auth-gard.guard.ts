import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'Services/login.service';

@Injectable({
  providedIn: 'root'
})
export class UserOnlyAuthGardGuard implements CanActivate {
  User: any = this._LoginService.currentUser.getValue();
  constructor(private _LoginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if ((this.User != null) && (this.User.Role == "User")) {
        console.log("User Only auth gaaaaaaarddddddddd")
        console.log(this.User.Role)
        console.log(this.User.Role == "User")
  
        return true;
      }
      else {
        console.log("this.User")
        console.log(this.User)
        this.router.navigate(['/Login'])
        return false;
      }
    }
  
  
  
}
