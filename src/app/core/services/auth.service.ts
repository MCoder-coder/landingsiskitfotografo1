import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { tap } from 'rxjs/operators';

import { TokenProvider } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //variables
  authUrl = '/api/login';
  apiUrl = '/api/api';
  options: any;


  /**
   * Constructor
   * @param http The http client object
   */
  constructor(private http: HttpClient, private token: TokenProvider) {}

  /**
   * Get an access token
   * @param e The email address
   * @param p The password string
   */
  loginToken() {

    return this.http.post(this.authUrl, {
      //grant_type: 'password',
      client_id: '3',
      token: '1wiHTUApPgQGVrwNkchIPQuIVL8xDhkLVvKEFoUA',
      e:  'nanod10@hotmail.com',  //e,
      p:  'Nano786521', //p,
      scope: ''
     }).pipe(
       tap((data: {token: string}) => {
         const token = data.token;
        // this.token.saveToken(token);
         console.log(data);
       })
     );
  }

  // loginRestApi(email: string, password: string, client_secret: string) {
  //   return this.http.post(this.authUrl, {
  //     email,
  //     password,
  //     client_secret
  //   })
  //   .pipe(
  //     tap((data: {token: string}) => {
  //       const token = data.token;
  //       this.token.saveToken(token);
  //     })
  //   );
  // }





  /**
   * Revoke the authenticated user token
   */
  // logout() {
  //   const options = {
  //     headers: new HttpHeaders({
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //       Authorization: 'Bearer ' + localStorage.getItem('access_token'),
  //     }),
  //   };
  //   return this.http.get(this.apiUrl + '/token/revoke', options);
  // }
}
