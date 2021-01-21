import { environment } from './../../../environments/environment';
import { async } from '@angular/core/testing';
import {
  HttpHeaders,
  HttpClient,
  HttpClientModule,
  HttpResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { truncateSync } from 'fs';
import { tap } from 'rxjs/operators';
// Imports...
@Injectable({
  providedIn: 'root',
})
export class TokenProvider {
  //variables
  authUrl = environment.url_login;
  apiUrl = environment.url_api;
  options: any;
  tokenRequest: any;
  tokenResponse: any;

  constructor(private http: HttpClient) {}

  load() {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        // Accept: 'application/json;charset=utf-8',
        //'Accept-Charset':'charset=utf-8'
      }),
    };
    const body = new HttpParams().set('client_id', '5');

    this.tokenRequest = this.http.post(this.authUrl, body.toString(), options);
    // .pipe(
    //       tap(async(httpResponse) =>{
    //           this.tokenResponse  = httpResponse;
    //       })
    //   )
    var myPromise = this.tokenRequest.toPromise().then((httpResponse) => {
      //console.log("Token Load promise THEN ");
      //console.log("httpResponse: ", httpResponse);
      this.tokenResponse = httpResponse;
    });
    return myPromise;

    /*
    return new Promise((resolve, reject) => {




          resolve(true)
        // .subscribe(  async(httpResponse) => {
        //   //httpResponse respuesta token del servidor
        //   // await new Promise((resolve) => setTimeout(resolve, 3000));
        //   console.log('obteniendo token');
        //  // console.log(httpResponse);
        //   // this.getAuthToken(httpResponse);
        //   this.tokenResponse = httpResponse;

        //   resolve(true);

        // });




      // resolve(true);
      // return this.xxx;
    });
    */
  }

  getTokenResponse() {
    return this.tokenResponse;
  }
}
