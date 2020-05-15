import { Component, OnInit, NgZone, AfterViewInit, Inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { User } from '../models/user';

@Component({
  selector: 'app-main-site',
  templateUrl: './main-site.component.html',
  styleUrls: ['./main-site.component.scss']
})
export class MainSiteComponent implements OnInit{

  users = [];
  user: User

  constructor(public _auth: AuthService,
      private http: HttpClient,
      private _userService:UserService,
      private _router: Router,
      @Inject(DOCUMENT) private document: Document) {
        
       }
 

  ngOnInit(): void {
    this.tokenCheck(this._auth.getToken(), true)

    //console.log(localStorage.getItem("user"))
  }

  chatUserId;
  menuOption = 0;

  changeContent(option: number) {
    this.menuOption = option;
  }

  openChat(id: string) {
    this.chatUserId = id;
  }

  closeChat() {
    this.chatUserId = '';
  }


  getUsers(){
    this._auth.getUsers()
      .subscribe(
        res => this.users = res,
        err => {
          //console.log(err)
          //this._router.navigate(['/main']);
        }
      )
  }

  tokenCheck(token, isA:boolean){
    this._auth.checkToken(token)
      .subscribe(
        res => {
          //console.log(res.id)
          //console.log(isA)
          this.updateIsOnline(res.id, isA);
          
        },
        err => {
          console.log(err)
          //this._router.navigate(['/globalchat']);
        }
      )
  }



  updateIsOnline(id, isA: boolean){
    let u = {
      userId: id,
      ifOnline: isA
    }
    //console.log(u)
    this._auth.updateOffline(u)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      );
  }

  logoutUsers(){
    this.tokenCheck(this._auth.getToken(), false)
    this._auth.logoutUser();
  }

}


