import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  private _userId: string;
  @Output() closeChatClicked = new EventEmitter();

  get userId(): string {
    return this._userId;
  }

  @Input() 
  set userId(id: string) {
    this._userId = id;
    if (this._userId === '') this.closeChat();
    else this.openChat();
  }
 
  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    
  }
  
  openChat() {
    const container = document.getElementById('chatContainer');
    container.style.display='block';
  }

  closeChat() {
    const container = document.getElementById('chatContainer');
    container.style.display='none';
    this.closeChatClicked.emit();
  }

}
