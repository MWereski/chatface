import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { User } from '../models/user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerUserData = {
    firstname: "",
    surname: "",
    email: "",
    password: "",
    age: null,
    province: "",
    city: ""
  };
  Alert = "AAA"

  emailAlert = "Błędny email"
  emailPass = "Poprawny email"

  nameAlert = "Brak imienia"
  namePass = "Poprawne imię"

  surrAlert = "Brak nazwiska"
  surrPass = "Poprawne nazwisko"
  
  passAlert = "Zbyt krótkie hasło"
  passPass = "Poprawne hasło"

  ageAlert = "Niepoprawny wiek"
  agePass = "Poprawny wiek"

  cityAlert = "Brak miasta"
  cityPass = "Poprawne miasto"

  provAlert = "Brak województwa"
  provPass = "Poprawne województwo"

  userData = new User('', '', '', '', '', '', null, '', null, '', [], [], [], [], []);

  public users = [];
  loginUserData = {
    email: "",
    password: ""
    };

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"; 
  agePattern = "^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|110)$";
  passwdPattern = "^.{8,}";

  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit(): void {
    //this.getUsers();
    
  }
  getUsers(){
    this._auth.getUsers()
      .subscribe(data => this.users = data);

  }

  getAuthToken(){
   // console.log(this.registerUserData);

    //console.log(this.loginUserData)
    this._auth.authenticateUser(this.loginUserData)
      .subscribe(
        res => {
          //console.log(res);
          localStorage.setItem('token', res.token);
          
          this.userData.id = res.id;
          this.userData.email = res.email;
          this.userData.role = res.role;
          this.userData.firstname = res.firstname;
          this.userData.surname = res.surname;
          this.userData.province = res.province;
          this.userData.age = res.age;
          this.userData.city = res.city;

          //console.log(this.userData);
          localStorage.setItem('user', JSON.stringify(this.userData));
          
        },
        err => console.log(err)
      )
  }

  registerUser(
      vEmail: NgModel,
      vAge: NgModel,
      vPasswd: NgModel,
      vFirstName: NgModel,
      vSurrname: NgModel,
      vProvince: NgModel,
      vCity: NgModel){

    this._auth.checkEmail(this.registerUserData.email)
      .subscribe(
        res =>{
          if(res.ifExist){
            this.emailPass = "Email w użyciu!"
            console.log("Email id used!");
          }
          else{
            if(vEmail.valid && vAge.valid && vPasswd.valid && vFirstName.valid && vSurrname.valid && vProvince.valid && vCity.valid)
            {
              this.regUser();
              //console.log(this.registerUserData);

              
              //this.loginUserData.email = this.registerUserData.email;
              //this.loginUserData.password = this.registerUserData.password;
              alert("Rejestracja pomyślna")
              this._router.navigate(['/login'])
              //this.getAuthToken();
            }
          }
        },
        err => console.log(err)

      )
    //this.regUser();
    //console.log(this.registerUserData);
    //this.getAuthToken();
  }

  

  regUser(){
    //console.log(this.registerUserData);
      this.registerUserData.age = Number(this.registerUserData.age);

          this._auth.registerUser(this.registerUserData)
            .subscribe(
              res => {
                //console.log(res)
                
                //localStorage.setItem('token', 'res.to')
                //this._router.navigate(['/main'])
              },
              err => console.log(err)
            ) 
  }

  
  
}
