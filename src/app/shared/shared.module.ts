import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {HeaderComponent} from './components/header/header.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FooterComponent} from './components/footer/footer.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    HeaderComponent,
    NavbarComponent,
    FooterComponent,

  ],
  exports: [
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    InfiniteScrollModule,

  ],
  imports: [
    CommonModule,
    RouterModule,
    InfiniteScrollModule,
    FontAwesomeModule

  ]
})



export class SharedModule{}
