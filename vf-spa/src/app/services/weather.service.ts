import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Weather} from '../models/Weather';
import {Observable, of} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

 // private url = 'https://uoz267kuoe.execute-api.us-east-2.amazonaws.com/default/weather';

  private url = environment.apiEndpoint;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods':'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers' : 'Content-Type'})
  };

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getWeather(): Observable<Weather> {
    return this.http.get<Weather>(
      this.url, this.httpOptions)
      .pipe(
        tap(_ => console.log('get weather')),
        catchError(this.handleError<Weather>('getWeather', ))
      );
  }


}
