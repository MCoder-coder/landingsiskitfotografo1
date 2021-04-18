import { Router } from '@angular/router';
import { Inject, NgModule} from '@angular/core';

import { Injectable } from '@angular/core';

import { Events } from '../models/events.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, retry, catchError } from 'rxjs/operators';
import { pipe } from 'rxjs/internal/util/pipe';

import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { Fotos } from '../models/fotos.model';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  // propiedades / variables
  events: Events[] = [];
  fotos: Fotos;


  constructor(private http: HttpClient, public toastr: ToastrService) {}

  getEventImportantService() {
    return (
      this.http
        .get<Events>(`${environment.url_api}eventos?page=0&per_page=12&order=fecha:DESC`)
        // return this.http.get(`${environment.url_api}eventos?page=0&per_page=12&order=fecha:DESC`)
        .pipe(
          map((eventosresponse: any) => {
            return eventosresponse.data.eventos as Events[];
          }),
          retry(0),
          catchError(this.handleError)
        )
    );
  }

  getEventDetailService(eventos_id: number, page: number) {
    //console.log('eventos_id event detail service: ', eventos_id);
    return (
      this.http
        .get(`${environment.url_api}fotos?eventos_id=${eventos_id}&page=${page}&per_page=4`)
        //return this.http.get(`${environment.url_api}fotos?eventos_id=${ID}&page=${page}&per_page=20`)
        .pipe(
          map((eventosresponse: any) => {
            return eventosresponse.data.fotos as Fotos;
          }),
          retry(0),
          catchError(this.handleError)
        )
    );
  }

  // getEventPage
  // Refactorizar nombre a getEventPage
  getEventPageService(page: number): Observable<Events[]> {
    return (
      this.http
        .get<Events>(
          `${environment.url_api}eventos?page=${page}&per_page=16&order=fecha:DESC`
        )
        //return this.http.get(`${environment.url_api}?page=0&per_page=16`)
        .pipe(
          map((eventosresponse: any) => {
            return eventosresponse.data.eventos as Events[];
          }),
          retry(0),
          catchError(this.handleError)
        )
    );

  }

  // tslint:disable-next-line: typedef
  public handleError(error: HttpErrorResponse) {
    //console.log('Algo salio mal');
    //console.log('error', error.status);
    if (error instanceof HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        console.error('Error Event');
        console.log('error.error', error.error);
      } else {
        console.log(`error status : ${error.status} ${error.statusText}`);
        switch (error.status) {
          case 404:
            //console.log(`redirect to 404`);
           // console.log('esto es un 404');
            // this.router.navigateByUrl('404')
            //this.toastr.error('Hello world!', 'Toastr fun!');
            //this.zone.run(()=> this.toastr.error('error'));
            break;
          case 403: //forbidden
            //console.log('esto es un 403');
            break;
        }
      }
    } else {
      //console.error('some thing else happened');
    }

    return throwError('Algo salio mal');
  }
}
