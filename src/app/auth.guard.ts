import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService,
              private _router: Router) {
                //this.tokenC(this._authService.getToken())
               }

  canActivate(): boolean{
    if (this._authService.loggedIn()){
      this.tokenC(localStorage.getItem('token'))
    }
    
    if(this.t1()){
      return true
    }
    else{
      return false
    }
   
  }

  t1(){
    if (this._authService.loggedIn()){   
      //this.tokenC(localStorage.getItem('token'))
          if(this._authService.loged()){
            let a = localStorage.getItem('token')
            let b = localStorage.getItem('test')
            let c = localStorage.getItem('user')
            //console.log(a)
            //console.log(b)
            console.log("Error5")
            if(a==b && c != null){
              console.log("Error4")
              return true
            }
            else{
              console.log("Error1")
              this._router.navigate(['/login'])
              return false
            }
          }
    }else{
      //localStorage.removeItem('token')
      console.log("Error2")
      this._router.navigate(['/login'])
      return false
    }
  }

  tokenC(token){
    this._authService.checkToken(token)
      .subscribe(
        res => {
          //console.log(res.token)
          
          if(res.id != null && res.id != ''){
            localStorage.setItem('test', localStorage.getItem('token'));
            if(this._router.url === "/login")
            {
              
              this._router.navigate(['/main'])
            }
          }
          else{
            localStorage.removeItem('token')
            localStorage.removeItem('test')
            localStorage.removeItem('user')
            this._router.navigate(['/login'])
            console.log("Error3")
          }
        },  
        err => {
          console.log(err)
        }
      )
  }
  
}
