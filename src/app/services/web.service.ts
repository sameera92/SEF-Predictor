import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WebService {
  constructor(private http: HttpClient) {}

  getCountries() {
    return this.http.get(`https://restcountries.eu/rest/v2/all`);
  }

  getLang() {
    return this.http.get('assets/language.json');
  }

  postMLModel(reqJson:any):Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'my-auth-token'
      })
    };
    return this.http.post<any>('http://127.0.0.1:5000/post_features', reqJson, httpOptions)
    .pipe(
      catchError(this.handleError('addHero', reqJson))
    );
  }
  
  handleError(arg0: string, hero: any): (err: any, caught: Observable<any>) => import("rxjs").ObservableInput<any> {
    throw new Error('Method not implemented.');
  }
}

