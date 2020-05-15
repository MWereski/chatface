import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MarkerService } from '../marker.service';
import { Location } from "@angular/common";
import * as L from 'leaflet';

const tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoibWlsZWswOSIsImEiOiJjazlkYnptNzgwMGhlM2ttcDZ6cjh6ZHp0In0.aUk6zTGSJQlqhQO-gI9_Cw'
});

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss'],
})
export class AddFriendComponent implements OnInit, AfterViewInit {

  userList: any;
  user: any;
  userFriendList: any;

  private map;
  myMarker;

  constructor(private _router: Router,
    private _userService: UserService,
    private markerService: MarkerService) { this.invalidateSize()}

  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    this._userService.getFriendList(this.user.id).subscribe(data => this.userFriendList = data);

    this._userService.getAllgetallasloggedin().subscribe(data => {
      this.userList = data;

      this.userList = this.userList.filter(user => {
        if (user.id === this.user.id)
          return null;

        return user;
      })

      this.refreshFriendList();

    });

  }

  refreshFriendList() {
    this.userList = this.userList.map(user => {
      const temp = this.userFriendList.find(friend => {
        friend.friendUser.id === user.id;
      })

      return temp === undefined ? user : null;
    })
  }

  addFriend(id: string) {
    //co ja tu potrzebuje ?
    this._userService.addFriend(this.user.id,id).subscribe(() => {
      this.refreshFriendList();
    });
    
  }
  ngAfterViewInit(): void {
    this.initMap();
    tiles.addTo(this.map);
    this.map.on('click', e => {
      //console.log(e.latlng)
      tiles.addTo(this.map);
      if(this.myMarker){
        this.map.removeLayer(this.myMarker);
      }
        this.myMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(this.map);
        this.markerService.getPlace(e.latlng.lat, e.latlng.lng, "pk.eyJ1IjoibWlsZWswOSIsImEiOiJjazlkYnptNzgwMGhlM2ttcDZ6cjh6ZHp0In0.aUk6zTGSJQlqhQO-gI9_Cw")
        .subscribe(
          res => {
            console.log(res.features[0].text)
            console.log(res.features[0].context[1].text)
          },
          err => console.log(err)
        );
    });
    //L.marker([51, 22]).addTo(this.map).bindPopup('<p>AAA</p>')
    
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 51.8282, 21.5795 ],
      zoom: 8
    });
  }
  
  onMapReady(map: L.Map) {
    this.initMap();
    tiles.addTo(this.map);
 }

  invalidateSize() {
    if (this.map) {
      setTimeout(() => {this.map.invalidateSize(true)},100);
    }
}

}
