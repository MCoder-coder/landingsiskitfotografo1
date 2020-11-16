import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent ,HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { TokenProvider } from './token.service';
import { ToastrService } from 'ngx-toastr';



@Injectable( {
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {



  constructor(private tokenService: TokenProvider ,  private toastrService: ToastrService){
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
    return next.handle(nextReq).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log('catch error en interceptor ',err);
        if (err.status === 404) {
          //this.router.navigateByUrl('/login');
          console.log('error de interceptor: ',err);
          this.toastrService.error(err.status + " " + err.statusText, "Ocurrio un error", { positionClass: 'toast-bottom-center' , timeOut:4000});
          console.log('after toast');
        }

        return throwError( err );

      })
    );
  }








}






