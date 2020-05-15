import { Component, OnInit, AfterViewInit} from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../marker.service';
import { Router } from '@angular/router';
import { Location } from "@angular/common";

const tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoibWlsZWswOSIsImEiOiJjazlkYnptNzgwMGhlM2ttcDZ6cjh6ZHp0In0.aUk6zTGSJQlqhQO-gI9_Cw'
});


@Component({
  selector: 'app-mapfinder',
  templateUrl: './mapfinder.component.html',
  styleUrls: ['./mapfinder.component.scss']
})
export class MapfinderComponent implements OnInit, AfterViewInit {

  private map;
  myMarker;

  route: string;

  constructor(private location: Location, private router: Router, private markerService: MarkerService) { 

    router.events.subscribe(val => {
      if (location.path() != "") {
        this.route = location.path();
      } else {
        this.route = "Home";
      }
    });

    this.invalidateSize()
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

  ngOnInit(): void {
    
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
ngOnDestroy() {
    tiles.addTo(this.map)
}


}
