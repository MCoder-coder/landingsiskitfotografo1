import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingFormComponent } from "./components/shopping-form/shopping-form.component";





const routes: Routes = [
  {
    path: '',
    component: ShoppingFormComponent
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
export class ShoppingFormComponentRoutingModule { }
