import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import { environment } from '../../../environments/environment';
import { WeatherShortDetails } from './weather.types';

@Injectable()
export class WeatherService {

  constructor(public http: HttpClient) {
  }

  public getCityWeatherByName(weatherCity: string, metric: 'metric' | 'imperial' = 'metric'): Subject<string> {
    const dataSub = new Subject<string>();
    this.http.get(
      `${environment.apiBaseUrl}/weather?q=${weatherCity}&units=${metric}&APPID=${environment.weatherAppId}`)
      // `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=952d6b1a52fe15a7b901720074680562`)
      .subscribe((data) => {
        dataSub.next(data['weather']);
      }, (err) => {
        console.log(err);
      });
    return dataSub;
  }

  public getCitiesWeathersByNames(weatherCities: Array<string>, metric: 'metric' | 'imperial' = 'metric'): Subject<any> {
    const weatherCitiesSubject = new Subject();
    weatherCities.forEach((weatherCity) => {
      weatherCitiesSubject.next(this.http.get(
        `${environment.apiBaseUrl}/weather?q=${weatherCity}&units=${metric}&APPID=${environment.weatherAppId}`));
        // `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=952d6b1a52fe15a7b901720074680562`));
    });
    return weatherCitiesSubject;
  }

  public getWeatherShortDetails(weatherPlace: string, metric: 'metric' | 'imperial' = 'metric'): Subject<WeatherShortDetails> {
    const dataSubject = new Subject<WeatherShortDetails>();
    this.http.get(
      `${environment.apiBaseUrl}/weather?q=${weatherPlace}&units=${metric}&APPID=${environment.weatherAppId}`)
      .subscribe((data: any) => {
        console.log(data);
        const details: WeatherShortDetails = {
        place:   weatherPlace,
        condition:  'Fog' , // data['weather'][0].main,
        currentTemp: Math.round(Number(data.main.temp)),
        minTemp: Math.round(Number(data.main.temp_min)),
        maxTemp: Math.round(Number(data.main.temp_max)),
        };
        dataSubject.next(details);
      });
    return dataSubject;
  }

  public getWeatherState(weatherCity: string): Subject<string> {
    const dataSubject = new Subject<string>();

    this.http.get(
      `${environment.apiBaseUrl}/weather?q=${weatherCity}&&APPID=${environment.weatherAppId}`)
      // `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=952d6b1a52fe15a7b901720074680562`)
      .subscribe((data) => {
        dataSubject.next(data['weather'][0].main);
      });
    return dataSubject;
  }

  public getCurrentTemp(weatherCity: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
    const dataSubject = new Subject<number>();
    this.http.get(
      `${environment.apiBaseUrl}/weather?q=${weatherCity}&units=${metric}&APPID=${environment.weatherAppId}`)
      // `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=952d6b1a52fe15a7b901720074680562`)
      .subscribe((weather: any) => {
        dataSubject.next(Math.round(Number(weather.main.temp)));
      });
    return dataSubject;
  }

  public getMinTemp(weatherCity: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
    const dataSubject = new Subject<number>();
    this.http.get(
      `${environment.apiBaseUrl}/weather?q=${weatherCity}&units=${metric}&APPID=${environment.weatherAppId}`)
      // `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=952d6b1a52fe15a7b901720074680562`)
      .subscribe((weather: any) => {
        dataSubject.next(Math.round(Number(weather.main.temp_min)));
      });
    return dataSubject;
  }

  public getMaxTemp(weatherCity: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
    const dataSubject = new Subject<number>();
    this.http.get(
      `${environment.apiBaseUrl}/weather?q=${weatherCity}&units=${metric}&APPID=${environment.weatherAppId}`)
      // `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=952d6b1a52fe15a7b901720074680562`)
      .subscribe((weather: any) => {
        dataSubject.next(Math.round(Number(weather.main.temp_max)));
      });
    return dataSubject;
  }

  public getCurrentHum(weatherCity: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
    const dataSubject = new Subject<number>();
    this.http.get(
      `${environment.apiBaseUrl}/weather?q=${weatherCity}&units=${metric}&APPID=${environment.weatherAppId}`)
      // `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=952d6b1a52fe15a7b901720074680562`)
      .subscribe((weather: any) => {
        console.log(weather);
        dataSubject.next(weather.main.humidity);
      });
    return dataSubject;
  }


  public getCurrentWind(weatherCity: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
    const dataSubject = new Subject<number>();
    this.http.get(
      `${environment.apiBaseUrl}/weather?q=${weatherCity}&units=${metric}&APPID=${environment.weatherAppId}`)
      // `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=952d6b1a52fe15a7b901720074680562`)
      .subscribe((weather: any) => {
        dataSubject.next(Math.round(Math.round(weather.wind.speed)));
      });
    return dataSubject;
  }


  public getMaxTempFromHrly(weatherCity: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
    const dataSubject = new Subject<number>();
    let max: number;
    this.http.get(
      `${environment.apiBaseUrl}/weather?q=${weatherCity}&units=${metric}&APPID=${environment.weatherAppId}`)
      // `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${metric}&APPID=952d6b1a52fe15a7b901720074680562`)
      .subscribe((weather: any) => {
        max = weather.list[0].main.temp;
        weather.list.forEach((value) => {
          if (max < value.main.temp) {
            max = value.main.temp;
          }
        });
        dataSubject.next(Math.round(max));
      });
    return dataSubject;
  }

  public getMinTempFromHrly(weatherCity: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
    const dataSubject = new Subject<number>();
    let min: number;
    this.http.get(
      `${environment.apiBaseUrl}/weather?q=${weatherCity}&units=${metric}&APPID=${environment.weatherAppId}`)
      // `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${metric}&APPID=952d6b1a52fe15a7b901720074680562`)
      .subscribe((weather: any) => {
        min = weather.list[0].main.temp;
        weather.list.forEach((value) => {
          if (min > value.main.temp) {
            min = value.main.temp;
          }
        });
        dataSubject.next(Math.round(min));
      });
    return dataSubject;
  }

  public getForecast(weatherCity: string, metric: 'metric' | 'imperial' = 'metric'): Subject<Array<any>> {
    const dataSubject = new Subject<Array<any>>();
    this.http.get(
      `${environment.apiBaseUrl}/weather?q=${weatherCity}&units=${metric}&APPID=${environment.weatherAppId}`)
      // `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${metric}&APPID=952d6b1a52fe15a7b901720074680562`)
      .subscribe((weather: any) => {
        dataSubject.next(weather.list);
      });
    return dataSubject;
  }

}
