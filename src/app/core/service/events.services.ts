
import { Injectable } from '@angular/core';

import { Events } from '../models/events.model';
import { HttpClient } from '@angular/common/http';
import { map, retry, catchError } from 'rxjs/operators';
import { pipe } from 'rxjs/internal/util/pipe';

import { from, Observable, throwError } from 'rxjs';
import { environment } from "./../../../environments/environment.prod";
import { Fotos } from '../models/fotos.model';
@Injectable({
  providedIn: 'root'
})
export class EventsService {

  // propiedades / variables
  events: Events[] = [];
  fotos: Fotos[] = [];

  constructor(private http: HttpClient) { }



  // getAllEvents() {
  //   return this.http.get(`/api/v3/eventos?page=0&per_page=16&order=fecha:DESC`)
  //   //return this.http.get(`${environment.url_api}?page=0&per_page=16`)
  //   .pipe(
  //     map((data: Events[]) => {
  //       return data;
  //     }), catchError( error => {
  //       return throwError( 'Something went wrong!' );
  //     })
  //  );
  // }



  getEventImportantService() {
    return this.http.get<Events>(`/api/v3/eventos?page=0&per_page=12&order=fecha:DESC`)
    .pipe(
      map((eventosresponse: any) => {
        //eventosresponse.data.eventos as Events[]
        return eventosresponse.data.eventos as Events[];
      }), retry(3), catchError(error => {
        return throwError('ALgo salio mal!!');
      })
    );
  }

  getEventDetailService(ID: number, page: number) {
    return this.http.get<Fotos>(`/api/v3/fotos?eventos_id=${ID}&page=${page}&per_page=20`)
    .pipe(
      map((eventosresponse: any) => {

        //eventosresponse.data.eventos as Events[]
        return eventosresponse.data.fotos as Fotos[];
      }), retry(3), catchError(error => {
        return throwError('ALgo salio mal!!');
      })
    );
  }

  // getEventPage
  // Refactorizar nombre a getEventPage
  getEventPageService(page: number): Observable<Events[]> {
    return this.http.get<Events>(`/api/v3/eventos?page=${page}&per_page=16&order=fecha:DESC`)
      //return this.http.get(`${environment.url_api}?page=0&per_page=16`)

      .pipe(
        map((eventosresponse: any) => {
          retry(3)
          //eventosresponse.data.eventos as Events[]
          return eventosresponse.data.eventos as Events[];
        }), retry(3), catchError(error => {
          return throwError('ALgo salio mal!!');
        })
      );

    // map((eventosresponse: any) =>
    //  eventosresponse.data.eventos as Events[]),
    // catchError(error => {
    //     return throwError('Algo salio mal');
    // })
  }


}
