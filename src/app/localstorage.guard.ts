import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageGuard implements CanActivate {

  constructor(private _router: Router){
    
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    localStorage.removeItem('user')

     let token = localStorage.getItem('token');
     let test = localStorage.getItem('test'); 
     let user = localStorage.getItem('user');

     //console.log(user)
     
     if(token == null || test == null || user == null){

      localStorage.removeItem('token')
      localStorage.removeItem('test')
      return true
     }else{
      this._router.navigate(['/main'])
       return false
     }
  }
  
}
