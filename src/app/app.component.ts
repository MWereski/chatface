import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../app/auth.service';
import { MainSiteComponent } from './main-site/main-site.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chatface';

  constructor(public _authService: AuthService) { }

  chatUserId;
  menuOption = 0;
  @Output() menuEvent = new EventEmitter();

  changeContent(option: number) {
    this.menuOption = option;
  }

  openChat(id: string) {
    this.chatUserId = id;
  }

  closeChat() {
    this.chatUserId = '';
  }

  changeContainer(option: number) {
    this.menuOption = option;
    this.menuEvent.emit(this.menuOption)
  }

}
