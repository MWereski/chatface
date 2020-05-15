import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-search-as-guest',
  templateUrl: './search-as-guest.component.html',
  styleUrls: ['./search-as-guest.component.scss']
})
export class SearchAsGuestComponent implements OnInit {

  constructor(private _auth: AuthService) { }

  users: any = []

  searchText;

  ngOnInit(): void {
    this.getUsersAsG()
  }

  getUsersAsG(){
    this._auth.getUsersAsGuest()
      .subscribe(
        res => {
          console.log(res)
          this.users = res
        }
      )
  }
  

}
