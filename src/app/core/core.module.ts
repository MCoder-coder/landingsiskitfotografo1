import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsService } from './service/events.services';
import {AuthService} from './services/auth.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    EventsService,
    AuthService
  ]
})
export class CoreModule { }
