
import { Injectable } from '@angular/core';

import { Events } from '../models/events.model';
import { HttpClient } from '@angular/common/http';
import { map , retry , catchError } from 'rxjs/operators';
import { pipe } from 'rxjs/internal/util/pipe';

import { from, Observable, throwError } from 'rxjs';
import { environment } from "./../../../environments/environment.prod";
@Injectable({
  providedIn: 'root'
})
export class EventsService {

  // propiedades / variables
  events: Events[] = [];


  constructor(private http: HttpClient) { }



  getAllEvents() {
    return this.http.get(`/api/v3/eventos?page=0&per_page=16&order=fecha:DESC`)
    //return this.http.get(`${environment.url_api}?page=0&per_page=16`)
    .pipe(
      map((data: Events[]) => {
        return data;
      }), catchError( error => {
        return throwError( 'Something went wrong!' );
      })
   );
  }



  getImages() {
  //  return this.events.find(item => id === item.id);
    //www.juanschtrefotografo.com.ar/schapi/api/v3/fotos?eventos_id=28&page=0&per_page=20
    return this.http.get(`/api/v3/eventos?page=0&per_page=12&order=fecha:DESC`);
  }

  getEventDetail(ID: number){
    return this.http.get<Events>(`/api/v3/fotos?eventos_id=${ID}&page=0&per_page=20`);
  }

  // getEventPage
  // Refactorizar nombre a getEventPage
  getEventScroll(page: number ){
    return this.http.get(`/api/v3/eventos?page=${page}&per_page=16&order=fecha:DESC`)
    //return this.http.get(`${environment.url_api}?page=0&per_page=16`)
    
    /*.pipe(
      map((data: Events[]) => {
        retry(3);
        return data;
      }), catchError( error => {
        return throwError( 'Algo salio mal!' );
      })
   );
      */
  }

//   randomPhotos(page: number = 1) {
//     return this.http.get(`https://api.pexels.com/v1/curated?per_page=15&page=${page}`)
//   }
// searchPhotos(query: string, page: number = 1) {
//     return this.http.get(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=15&page=${page}`)
//   }
}
