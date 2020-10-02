import {
  HttpHeaders,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
// Imports...
@Injectable({
  providedIn: 'root',
})
export class TokenProvider {
  //variables
  authUrl = '/api/login';
  apiUrl = '/api/api';
  options: any;
  tokenRequest: any;
  tokenResponse: any;

  constructor(private http: HttpClient) { }

  load() {
    return new Promise((resolve, reject) => {
      const options = {
        headers: new HttpHeaders({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      };
      this.tokenRequest = this.http
        .post(
          this.authUrl,
          {
            grant_type: 'password',
            client_id: '3',
            client_secret: '1wiHTUApPgQGVrwNkchIPQuIVL8xDhkLVvKEFoUA',
            username: 'nanod10@hotmail.com', // e,
            password: 'Nano786521', // p,
          },
          options
        )
        .subscribe(async (httpResponse) => {

          //httpResponse respuesta token del servidor
          // await new Promise((resolve) => setTimeout(resolve, 3000));
          console.log('obteniendo token');
          console.log(httpResponse);
          // this.getAuthToken(httpResponse);
          this.tokenResponse = httpResponse;
          resolve(this.tokenResponse);
        });



      // resolve(true);
      // return this.xxx;
    });
  }

  getTokenResponse() {
    return this.tokenResponse;
  }

}
