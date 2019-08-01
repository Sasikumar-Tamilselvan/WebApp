import { Component, OnInit } from '@angular/core';
import { UiService } from '../../services/ui/ui.service';
import { WeatherService } from '../../services/weather/weather.service';
import { WeatherShortDetails } from '../../services/weather/weather.types';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {
  public darkMode: boolean;
  public weatherShortDetails: WeatherShortDetails;

  constructor(
    public ui: UiService,
    public weatherService: WeatherService) {
    }

  public ngOnInit() {
    this.ui.darkModeState.subscribe((value) => {
    this.darkMode = value;
  });
  this.weatherService.getWeatherShortDetails('Ooty').subscribe((data) => {
    this.weatherShortDetails = data;
  });

  console.log(this.darkMode);
  }
}
