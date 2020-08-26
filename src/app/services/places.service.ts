import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  url='https://viacep.com.br/ws/';

  constructor(private http: HttpClient) { }

  getByPostalCode(postalCode) {
	  return this.http.get(`${this.url}${postalCode}/json/`, {responseType: 'json'});
  }
  
}
