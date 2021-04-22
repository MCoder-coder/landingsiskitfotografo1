import { CartRoutingModule } from './cart-rotuing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from './../shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NoRightClickDirective } from '../no-right-click.directive';

import { CartComponent } from "./components/cart/cart.component";



@NgModule({
  declarations: [

    CartComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CartRoutingModule,
    FormsModule,
    ReactiveFormsModule,


  ]
})
export class CartModule {

}
