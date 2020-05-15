import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../auth.service';
import { SignalRService } from '../signal-r.service';
import { HttpClient } from '@angular/common/http'
import { Message } from '../_class/Message';

@Component({
  selector: 'app-globalchat',
  templateUrl: './globalchat.component.html',
  styleUrls: ['./globalchat.component.scss']
})
export class GlobalchatComponent implements OnInit{

  users:any = [];
  txtMessage: string = '';
  recievedMessages = [];

  myNumber: Number;


  constructor(private _auth: AuthService,
    public signalRService: SignalRService,
     private http: HttpClient,
     private _ngZone: NgZone){
      this.subscribeToEvents(); 
}

  ngOnInit(){
    this.myNumber = this.getRandomInt(0, 999999);

    this.getUsersAsG();

    //console.log(this.users)
  }

  getUsersAsG(){
    this._auth.getUsersAsGuest()
      .subscribe(
        res => this.users = res,
        err => console.log(err)
      )
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  sendMessage(): void {  
    if (this.txtMessage) {  
      this.signalRService.sendMessage(this.txtMessage);  
      this.txtMessage = '';  
    }
    console.log(this.users)  
  } 
  
  private subscribeToEvents(): void {  

    this.signalRService.messageReceived.subscribe((message: string) => {  
      this._ngZone.run(() => {
        if( this.recievedMessages.length >= 100){
          this.recievedMessages.shift();
        }
        this.recievedMessages.push(message);
      });  
    });  
  }  


}
