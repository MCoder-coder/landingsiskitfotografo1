
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


//import { ProductDetailComponent } from './components';
import {EventsGallerycontainerComponent} from './components/events-container/events-container.component';
import {EventDetailComponent} from './components/events-detail/events-detail.component';


const routes: Routes = [
  {
    path: '',
    component: EventsGallerycontainerComponent
  },
  {
    path: ':id',
    component: EventDetailComponent
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
