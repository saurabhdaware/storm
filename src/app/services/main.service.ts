import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient,HttpHeaders, HttpErrorResponse} from '@angular/common/http'

@Injectable()
export class MainService {

  constructor(private http:HttpClient) {
      this.getWeather();
  }

  public getWeather() {
    return this.http.get("http://api.openweathermap.org/data/2.5/weather?lat=13.73&lon=80.23&appid=22ea153019299dbbb2ee4028bd3ff603");
  }

//

}