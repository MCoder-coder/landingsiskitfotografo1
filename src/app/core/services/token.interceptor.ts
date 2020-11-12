import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenProvider } from './token.service';



@Injectable()
export class TokenInterceptor implements HttpInterceptor {



  constructor(private tokenService: TokenProvider){
      console.log(tokenService);

  }

  intercept(req: HttpRequest<any> , next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('INTERCEPTOR');

    const token = this.tokenService.getTokenResponse();

    console.log('Interceptor: tokenService: ',this.tokenService);
    console.log('Interceptor: tokenResponse: ', token);
    // console.log(this.tokenService.tokenResponse.access_token);
    // console.log(this.tokenService.getAuthToken(), 'este es el token');

    /* modificacion de headers de request */
    let newHeaders = req.headers;

    newHeaders = newHeaders.append('Access-Control-Allow-Origin', '*');

    if (this.tokenService.tokenResponse) {
       newHeaders = newHeaders.append('Authorization', 'Bearer ' + token.access_token);
    }
    const nextReq = req.clone({headers: newHeaders});
    return next.handle(nextReq);
  }








}






