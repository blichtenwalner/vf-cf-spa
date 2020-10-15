import { Component } from '@angular/core';
import {WeatherService} from "./core/services/weather.service";
import {Weather} from "./core/models/Weather";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'voice';
  weather: Weather;

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit(){
    this.weatherService.getWeather().subscribe(resp=>{
      this.weather=resp;
      console.log(resp);
    });
  }

}

