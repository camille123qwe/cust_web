

import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Response, Http} from "@angular/http";
/*
  Generated class for the CityPickerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CityPickerProvider {

  constructor(public http: Http) {
    console.log('Hello CityPickerProvider Provider');
  }
  geCityData() {
    return this.http.get('./assets/data/city-data.json').map((res: Response) => res.json());
  }
}
