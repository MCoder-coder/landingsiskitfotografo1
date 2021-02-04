import { APP_INITIALIZER } from '@angular/core';
import { TokenProvider } from './core/services/token.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NoRightClickDirective } from './no-right-click.directive';


import {InfiniteScrollModule} from 'ngx-infinite-scroll';

import { TokenInterceptor } from "./core/services/token.interceptor";
import { ModalModule } from 'ngx-bootstrap/modal';
import { CartAddModalComponent } from './shared/components/cart/cart-add-modal/cart-add-modal.component';


// La función exportada para ejecutar los proveedores antes que arranque angular
export function appInitFactory(token: TokenProvider) {
  return () => token.load();
}


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,



  ],
  imports: [
    BrowserModule,
    InfiniteScrollModule,
    FormsModule,
    SharedModule,
    CoreModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    ReactiveFormsModule

  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitFactory,
      multi: true,
      deps: [TokenProvider],

    },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }

  ],
  entryComponents: [CartAddModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
