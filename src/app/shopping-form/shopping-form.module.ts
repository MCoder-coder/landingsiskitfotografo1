import { ShoppingFormComponentRoutingModule } from './shopping-form-rounting.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from './../shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NoRightClickDirective } from '../no-right-click.directive';

import { ShoppingFormComponent  } from "./components/shopping-form/shopping-form.component";

@NgModule({
  declarations: [
    ShoppingFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShoppingFormComponentRoutingModule,
    FormsModule,
    ReactiveFormsModule,


  ]
})
export class ShoppingFormModule {

}
