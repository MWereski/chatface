import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

 loginUserData = {
    email: "",
    password: ""
 };

 Alert = ""

 public users = [];
 userData = new User('', '', '', '', '', '', null, '', null, '', [], [], [], [], []);

  constructor(private _auth: AuthService,
              private _router: Router,
              private _userService:UserService) { }

  ngOnInit(): void {
    //this.getUsers();
  }

  getUsers(){
    this._auth.getUsers()
      .subscribe(data => this.users = data);   
  }
  

  loginUser(){
    if(!this._auth.loggedIn()){
      this._auth.authenticateUser(this.loginUserData)
      .subscribe(
        res => {
          //console.log(res);
          localStorage.setItem('token', res.token);
          //console.log(res);
          this.userData.id = res.id;
          this.userData.email = res.email;
          this.userData.role = res.role;
          this.userData.firstname = res.firstname;
          this.userData.surname = res.surname;
          this.userData.province = res.province;
          this.userData.age = res.age;
          this.userData.city = res.city;

          console.log(this.userData);
          localStorage.setItem('user', JSON.stringify(this.userData));

          this._router.navigate(['/main']);
          //this._auth.getIdUserStorage(res.token);
        },
        err => {
          this._router.navigate(['/login']);
          this.Alert = "Błędny Email lub hasło!"
          console.log(err);
        }
      )
    }else{
      this._router.navigate(['/main']);
    }
  }
}
