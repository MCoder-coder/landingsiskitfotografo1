
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {LoginComponent} from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { DemoComponent } from './components/demo/demo/demo.component';

@NgModule({
  declarations: [
    LoginComponent,
    DemoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule
  ]
})


export class LoginModule{}
