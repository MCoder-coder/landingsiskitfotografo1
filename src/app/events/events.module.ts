
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SlideComponent} from './components/slide/slide.component';
import {EventsGallerycontainerComponent} from './components/events-container/events-container.component';
import { PhotoRoutingModule } from './events-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EventDetailComponent } from './components/events-detail/events-detail.component';
import { EventComponent } from './components/event/event.component';
import { NoRightClickDirective } from '../no-right-click.directive';
@NgModule({
  declarations: [
    SlideComponent,
    EventsGallerycontainerComponent,
    EventComponent,
    EventDetailComponent,



  ],
  imports: [
    CommonModule,
    SharedModule,
    PhotoRoutingModule,

  ]
})
export class EventsModule {

}
