import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { APP_INITIALIZER } from '@angular/core';
import { TokenProvider } from './core/services/token.service';



// La función exportada para ejecutar los proveedores antes que arranque angular
export function servicesOnRun(token: TokenProvider) {
  return () => {token.load()};
}


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    CoreModule,
    HttpClientModule

  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: servicesOnRun,
      multi: true,
      deps: [TokenProvider]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
