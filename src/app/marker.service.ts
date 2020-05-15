import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor(private http: HttpClient) { }

  getPlace(lat, lng, token): Observable<any>{
    return this.http.get<any>("https://api.mapbox.com/geocoding/v5/mapbox.places/"+ lng +","+ lat +".json?types=place&access_token=" + token);
  }


}
