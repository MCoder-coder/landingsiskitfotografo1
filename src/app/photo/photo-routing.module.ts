import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


//import { ProductDetailComponent } from './components';
import {GalleryComponent} from './components/gallery/gallery.component';
import {PhotoDetailComponent} from './components/photo-detail/photo-detail.component';


const routes: Routes = [
  {
    path: '',
    component: GalleryComponent
  },
  {
    path: ':id',
    component: PhotoDetailComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class PhotoRoutingModule {}
