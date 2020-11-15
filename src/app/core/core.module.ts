import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsService } from './service/events.services';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    EventsService,

  ]
})
export class CoreModule { }
