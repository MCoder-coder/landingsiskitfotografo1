import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotoService } from './service/photo.services';
import {AuthService} from './services/auth.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    PhotoService,
    AuthService
  ]
})
export class CoreModule { }
