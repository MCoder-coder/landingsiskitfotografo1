import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SlideComponent} from './components/slide/slide.component';
import {GalleryComponent} from './components/gallery/gallery.component';
import { PhotoRoutingModule } from './photo-routing.module';
import { SharedModule } from './../shared/shared.module';
import { PhotoDetailComponent } from './components/photo-detail/photo-detail.component';

@NgModule({
  declarations: [
    SlideComponent,
    GalleryComponent,
    PhotoDetailComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    PhotoRoutingModule,



  ]
})
export class PhotoModule {

}
