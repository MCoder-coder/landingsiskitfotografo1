import { Size } from './../../../core/models/sieze.model';

import { Fotos } from './../../../core/models/fotos.model';
import { Foto } from './../../../core/models/foto.model';
import { Events } from './../../../core/models/events.model';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Event, Params } from '@angular/router';

import { EventsService } from '../../../core/services/events.services';

import { from, Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { pipe } from 'rxjs/internal/util/pipe';

import {
    faCoffee,
    fas,
    faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import { threadId } from 'worker_threads';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CartService } from 'src/app/core/services/cart.service';
import { CartItem } from './../../../core/models/cartitem.model';
import { CartAddModalComponent } from 'src/app/shared/components/cart/cart-add-modal/cart-add-modal.component';
import { CartModalDialogService } from 'src/app/core/services/cart.modal.service';

@Component({
    selector: 'app-photo-detail',
    templateUrl: './events-detail.component.html',
    styleUrls: ['./events-detail.component.css'],
})
export class EventDetailComponent implements OnInit {
    @Input()
    //evento: Observable<Events>;
    fotos: Fotos[] = [];
    modalRef: BsModalRef;
    //

    mcartItemModel: CartItem;
    fotosArray: Fotos;
    //evento: Events;
    ID: number = null;
    private actualPage: number;
    private nextPage: number;
    page: number;
    public isMobile: boolean;
    private isLoading: boolean;
    photo: any;
    googleIcon = faShoppingCart;
    Object = Object;
    newItemCart: CartItem;
    fakeCartForPopup: CartItem[] = [];

    //BsModalService nos permite abrir el modal

    constructor(
        private route: ActivatedRoute,
        private eventService: EventsService,
        private modalService: BsModalService,
        private cartService: CartService,
        private cartModalService : CartModalDialogService
    ) {
        // console.log(this.route.snapshot.paramMap.get('id/page'));

        this.fotosArray = [];
        this.page = 0;
        this.actualPage = 0;
        this.nextPage = 1;
        this.isLoading = false;
        this.photo = '';
        //condicional para pantallas moviles
        if (window.innerWidth < 768) {
            this.isMobile = true;
        } else {
            this.isMobile = false;
        }
    }

    ngOnInit(): void {
        let ID = +this.route.snapshot.paramMap.get('id');
        this.ID = ID;
        this.eventService.getEventDetailService(ID, this.page);
        // console.log('ID DEL EVENTO: ', ID);
        this.fetchEventsFotos(ID, this.actualPage);
    }

    //obtengo las fotos del request
    fetchEventsFotos(ID: number, page: number) {
        //console.log('ID Fetch Event Fotos: ', ID);
        this.isLoading = true;
        this.eventService
            .getEventDetailService(ID, page)
            .subscribe((eventosresponse: any) => {
                this.isLoading = false;
                  console.log(eventosresponse, 'evento detalle');
                //this.fotosArray = eventosresponse;
                 console.log(' RESPONSE: ', eventosresponse);

                //console.log('eventosresponse.data.fotos: ', eventosresponse);
                //console.log('this.fotosArray: ', this.fotosArray.length);
                if (eventosresponse) {
                    //this.fotosArray.push(...eventosresponse);

                    if (page >= this.actualPage) {
                        this.actualPage = page;
                        //  console.log('Setea this.actualPage: ', this.actualPage);
                        return eventosresponse[this.fotosArray.push(...eventosresponse)];
                    }
                }
            });
    }





    addToCartPopUp(foto : Foto){
        this.cartService.addToCartPopUp(foto)

    }


    //scroll infinito
    onScroll() {
        //console.log('estas haciendo scroll');
        ///si no esta cargado
        if (!this.isLoading) {
            // console.log('actualPage: ', this.actualPage);
            // sumame mas uno de la siguiente pagina
            this.nextPage = this.actualPage + 1;
            //console.log('nextPage: ', this.nextPage);

            //console.log('pide pagina siguiente: getEventPage() ');
            //obtenes las siguiente fotos del request con el id de la pag
            this.fetchEventsFotos(this.ID, this.nextPage);
        }
    }

    //(change)se activa cuando el usuario cambia la entrada
}
