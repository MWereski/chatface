import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  friendList: any;
  user: User;

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    //console.log(this.user);
    this._userService.getFriendList(this.user.id)
      .subscribe(
          data => {
            if(data != null){
              console.log(data)
              this.friendList = data
            }else{
              
              this.friendList = Array<string>(this.friendList);
              
            }
          }
          
          );

  }

}
