import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EventsComponent} from './components/events/events.component';
import { SwiperComponent } from './components/swiper/swiper.component';
import { HomeComponent } from './components/home/home.component';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from './../shared/shared.module';


@NgModule({
  declarations: [
    SwiperComponent,
    EventsComponent,
    HomeComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,

  ]
})
export class HomeModule {

}
