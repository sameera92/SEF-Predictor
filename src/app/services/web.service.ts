import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  constructor (
    private http: HttpClient
  ) {}

  getCountries() {
    return this.http.get(`https://restcountries.eu/rest/v2/all`);
  }

getLang(){
  return this.http.get("assets/language.json");
}

}

