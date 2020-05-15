import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss']
})
export class FriendListComponent implements OnInit {

  friendsList = [];
  @Output() friendClicked = new EventEmitter();
  @Input() friendId: string;

  user: User;
  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this._userService.getFriendList(this.user.id).subscribe(data => this.friendsList = data);

  }

  openChat(id: string) {
    this.friendClicked.emit(id);
  }




}
