import { Component } from '@angular/core';
import {WeatherService} from './services/weather.service';
import {Weather} from './models/Weather';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vf-spa';
  weather: Weather;
  today: number = Date.now();

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit(){
    this.weatherService.getWeather().subscribe(resp => {
      this.weather = resp;
      console.log(resp);
    });
  }
}
