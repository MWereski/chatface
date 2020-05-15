import { Injectable, EventEmitter } from '@angular/core';
import { apipath } from '../app/_class/apipath';
import * as signalR from '@aspnet/signalr';
import { Message } from '../app/_class/Message';

const rootPath: apipath = new apipath();

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  messageReceived = new EventEmitter<string>();  
  connectionEstablished = new EventEmitter<Boolean>(); 

  private _chatHub = rootPath.hubPath + '/chathub';

  private connectionIsEstablished = false; 
  private hubConnection: signalR.HubConnection;


  constructor() {

    this.createConnection();  
    this.registerOnServerEvents();  
    this.startConnection();
   }
    private createConnection() {  
      this.hubConnection = new signalR.HubConnectionBuilder()
                                .withUrl(this._chatHub, {
                                  skipNegotiation: true,
                                  transport: signalR.HttpTransportType.WebSockets
                              })
                                .build();

    } 
    private startConnection(): void {   
      this.hubConnection
        .start()
        .then(() => {
          this.connectionIsEstablished = true;  
          console.log('Hub connection started');  
          this.connectionEstablished.emit(true);
        })
        .catch(err => {  
          console.log('Error while establishing connection, retrying...');  
          //setTimeout(function () { this.startConnection(); }, 5000);  
        });
    } 

    private registerOnServerEvents(): void {  
      this.hubConnection.on('recieveGlobalMessage', (data: any) => {
        console.log("Recived: " + data);  
        this.messageReceived.emit(data);  
      });  
    } 

  sendMessage(message: String) {  
    console.log("Sended: " + message);
    this.hubConnection.invoke('SendToGlobalAsync', message); 
    
  } 
}
