import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenProvider } from './token.service';
import { logging } from 'protractor';
import { AuthService } from './auth.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenProvider, private authService: AuthService){}

  intercept(req: HttpRequest<any> , next: HttpHandler): Observable<HttpEvent<any>> {




    console.log('INTERCEPTOR');
    const token = this.tokenService.getAuthToken();
    let newHeaders = req.headers;
    if (token) {
      newHeaders = newHeaders.append('AUTOTOKEN', token);
    }
    const authReq = req.clone({headers: newHeaders});
    return next.handle(authReq);
  }








}






