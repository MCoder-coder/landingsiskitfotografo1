import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoComponent } from './components/demo/demo/demo.component';
import { LoginComponent } from './components/login/login.component';



const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'demo',
    component: DemoComponent
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


export class LoginRoutingModule{}
