import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';

import { GuestGuardService } from '../core/services/guest-guard.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },


];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule {}
