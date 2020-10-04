
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SlideComponent} from './components/slide/slide.component';
import {GalleryComponent} from './components/events-gallery/events-gallery.component';
import { PhotoRoutingModule } from './events-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EventDetailComponent } from './components/events-detail/events-detail.component';

@NgModule({
  declarations: [
    SlideComponent,
    GalleryComponent,
    EventDetailComponent

  ],
  imports: [
    CommonModule,
    SharedModule,
    PhotoRoutingModule,



  ]
})
export class EventsModule {

}
