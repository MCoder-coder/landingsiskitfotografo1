import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {HeaderComponent} from './components/header/header.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FooterComponent} from './components/footer/footer.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CartAddModalComponent } from './components/cart/cart-add-modal/cart-add-modal.component';
import { ConfirmationDialogService  } from "../core/services/confirmation-dialog.service";

import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    CartAddModalComponent,
    ConfirmationDialogComponent,


  ],
  exports: [
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    InfiniteScrollModule,
    FontAwesomeModule
    ,FormsModule,
    ReactiveFormsModule,
    CartAddModalComponent


  ],
  imports: [
    CommonModule,
    RouterModule,
    InfiniteScrollModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    NgbModule,

  ]
})



export class SharedModule{}
