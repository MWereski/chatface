import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{

  isLoggedIn = true;
  userData = new User('', '', '', '', '', '', null, '', null, '', [], [], [], [], []);
  @Output() menuEvent = new EventEmitter();
  menuOption = 0;

  constructor(private _userService:UserService, public _authService:AuthService) {
      
   }

  ngOnInit(): void {

    //console.log(localStorage.getItem("token"))
    //console.log(localStorage.getItem("test"))
    //console.log(localStorage.getItem("user"))

    this.userData = JSON.parse(localStorage.getItem('user'));
    console.log(this.userData);
  }

  //login(id:string) {
  //  this._userService.getUserById(id).subscribe(data => this.userData = data);
  //  localStorage.setItem('user', JSON.stringify(this.userData));
  //}

  changeContainer(option: number) {
    this.menuOption = option;
    this.menuEvent.emit(this.menuOption)
  }

}
