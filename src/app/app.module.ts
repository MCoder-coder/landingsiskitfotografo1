import { APP_INITIALIZER, Pipe } from '@angular/core';
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
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';

import {InfiniteScrollModule} from 'ngx-infinite-scroll';

import { TokenInterceptor } from "./core/services/token.interceptor";
import { ModalModule } from 'ngx-bootstrap/modal';
import { CartAddModalComponent } from './shared/components/cart/cart-add-modal/cart-add-modal.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogService } from './core/services/confirmation-dialog.service';
import { CartModalDialogService } from './core/services/cart.modal.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

// La función exportada para ejecutar los proveedores antes que arranque angular
export function appInitFactory(token: TokenProvider) {
  return () => token.load();
}


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent



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
    ReactiveFormsModule,
    NgbModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })

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
    },
    [ConfirmationDialogService],
    [CartModalDialogService],
    [NgbActiveModal]
  ],

  entryComponents: [CartAddModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
