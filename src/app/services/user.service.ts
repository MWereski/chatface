import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = "http://192.168.6.5:5533/api";

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get(this.url + '/Users');
  }
  getAllgetallasloggedin() {
    return this.http.get(this.url + '/Users/getallasloggedin');
  }

  getUserFriendList(id: string) {
    return this.http.get(this.url + `/FriendsLists/${id}`)
  }

  getUserById(id:string) {
    return this.http.get<User>(this.url + `/Users/${id}`);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getFriendList(id: string) {
    return this.http.get<any>(this.url + `/FriendsLists/getfriendsofuser/${id}`);
  }

  addFriend(userId: string, friendId: string) {
    return this.http.put(this.url + '/FriendsLists/update',{
      "id": userId,
      "ownerUserId": userId,
      "friendUserId": friendId
    });
  }
}
