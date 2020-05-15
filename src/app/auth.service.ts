import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from './_class/user';
import { apipath } from '../app/_class/apipath';
import { Router } from '@angular/router';
import { tap, share, shareReplay } from 'rxjs/operators';
import { UserService } from './services/user.service';
import { User } from './models/user';


const rootPath: apipath = new apipath();

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private _registerUrl = rootPath.path + '/Users/create';
  private _getUsersUrl = rootPath.path + '/Users/getall';
  private _authenticateUrl = rootPath.path + '/Users/authenticate';
  private _checkEmailUrl = rootPath.path + '/Users/checkifmailexist';
  private _updateOnlineUrl = rootPath.path + '/Users/updateonlinestate';
  private _checkToken = rootPath.path + '/Users/checkiftokenexist';
  private _getUsersAsGuest = rootPath.path + '/Users/getallasguests'
  constructor(private http: HttpClient,
              private _router: Router,
              private _userService: UserService) { 
    
  }

  registerUser(user): Observable<any>{
    return this.http.post<any>(this._registerUrl, user);
    //fetch("http://example.com", { mode: "no-cors" });
  }

  getUsers(): Observable<any>{
    return this.http.get<IUser[]>(this._getUsersUrl);
  }
  getUsersAsGuest(): Observable<IUser[]>{
    return this.http.get<IUser[]>(this._getUsersAsGuest);
  }

  authenticateUser(user):  Observable<any>{
    //console.log(user);
    return this.http.post<any>(this._authenticateUrl, user);
  }

  checkEmail(email): Observable<any>{
    return this.http.get<any>(this._checkEmailUrl + '/' + email);
  }

  updateOffline(user): Observable<any>{
    return this.http.put<any>(this._updateOnlineUrl, user, { headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                                                                        'Authorization': 'Bearer ' + this.getToken() }) });
  }

  checkToken(token): Observable<any>{
    return this.http.get<any>(this._checkToken + "/" + token).pipe(share())
  }



  /* registerUser(user): Observable<any> {
    return from(
      fetch(
        this._registerUrl, // the url you are trying to access
       {
          body: JSON.stringify(user),
          headers: {
            'Content-Type': 'application/json-patch+json',
          },
          method: 'POST', // GET, POST, PUT, DELETE
          mode: 'no-cors' // the most important option
        }
      ));
  } */

  loggedIn(){
    //this.tokenC(this.getToken())
    return !!localStorage.getItem('token');
  }
  loged(){
    return !!localStorage.getItem('test');
  }

  

  getToken(){
    return localStorage.getItem('token');
  }

  logoutUser(){
    this.tokenCheck(this.getToken(), false)
    //console.log(this.getToken())
    this._router.navigate(['/globalchat']);
  }

  tokenCheck(token, isA:boolean){
    this.checkToken(token)
      .subscribe(
        res => {
          //console.log(res.id)
          //console.log(isA)
          this.updateIsOnline(res.id, isA);
          localStorage.removeItem('token');
          localStorage.removeItem('test');
          localStorage.removeItem('user');
        },
        err => {
          console.log(err)
          this._router.navigate(['/globalchat']);
        }
      )
  }

  updateIsOnline(id, isA: boolean){
    let u = {
      userId: id,
      ifOnline: isA
    }
    //console.log(u)
    this.updateOffline(u)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      );
  }

}
