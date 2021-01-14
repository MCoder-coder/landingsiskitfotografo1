import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EventsImportantComponent} from './components/events-important/events-important.component';
import { SwiperComponent } from './components/swiper/swiper.component';
import { HomeComponent } from './components/home/home.component';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from './../shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NoRightClickDirective } from '../no-right-click.directive';

@NgModule({
  declarations: [
    SwiperComponent,
    EventsImportantComponent,
    HomeComponent,


  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,


  ]
})
export class HomeModule {

}
