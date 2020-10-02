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
  xxx: any;

  constructor(private http: HttpClient) { }

  load() {
    return new Promise((resolve, reject) => {
      const options = {
        headers: new HttpHeaders({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      };
      this.xxx = this.http
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
        .subscribe(async (x) => {
          await new Promise((resolve) => setTimeout(resolve, 3000));
          console.log('obteniendo token');
        });

      console.log(this.xxx);

      // resolve(true);
      // return this.xxx;
    });
  }



  getAuthToken(): string {

    return "TOKEN-ABCDEFG";
  }

}
