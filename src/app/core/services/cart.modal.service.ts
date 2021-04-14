import { Injectable } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Size } from 'src/app/core/models/sieze.model';
import { CartAddModalComponent } from 'src/app/shared/components/cart/cart-add-modal/cart-add-modal.component';

import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';

@Injectable()
export class CartModalDialogService {
    constructor(private modalService: BsModalService) {}

    public cartOpenDialogModal(initialState) {

        const modalRef = this.modalService.show(CartAddModalComponent , {
            initialState
        });
        //  this.modalRef = this.modalService.show(CartAddModalComponent, {
        //      initialState,
        //  });
        console.log("modal ref" , initialState)
        return modalRef
    }
}
