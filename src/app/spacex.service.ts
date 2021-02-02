import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpacexService {

  API_BASE_URL:string = 'https://api.spaceXdata.com/v3/launches?limit=100';

  constructor(private http:HttpClient) { }

  getUpdatedApiUrl(filters) {
   let url = this.API_BASE_URL;
    filters.forEach((element) => {
      if(element.value != undefined){
        url = url + '&'+ element.type + '=' +element.value;
      }
    });
    return url;
  }

  getData(url):Observable<any[]>{
    return this.http.get<any[]>(url).pipe(
      catchError(err => throwError)
    )
  }
}
