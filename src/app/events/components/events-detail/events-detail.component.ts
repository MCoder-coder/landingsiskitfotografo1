import { Fotos } from './../../../core/models/fotos.model';
import { Events } from './../../../core/models/events.model';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Event, Params } from '@angular/router';

import { EventsService } from '../../../core/services/events.services';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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

@Component({
  selector: 'app-photo-detail',
  templateUrl: './events-detail.component.html',
  styleUrls: ['./events-detail.component.css'],
})
export class EventDetailComponent implements OnInit {
  @Input()
  //evento: Observable<Events>;
  fotos: Fotos[] = []
  modalRef: BsModalRef;
  //
  mcartItemModel: CartItem;
  fotosArray: Fotos[];
  //evento: Events;
  ID: number = null;
  private actualPage: number;
  private nextPage: number;
  page: number;
  public isMobile: boolean;
  private isLoading: boolean;
  photo : any
  googleIcon = faShoppingCart;
  Object = Object;


  //BsModalService nos permite abrir el modal

  constructor(
    private route: ActivatedRoute,
    private eventService: EventsService,
    private modalService: BsModalService,
    private cartService: CartService
  ) {
   // console.log(this.route.snapshot.paramMap.get('id/page'));

    this.fotosArray = new Array<Fotos>();
    this.page = 0;
    this.actualPage = 0;
    this.nextPage = 1;
    this.isLoading = false;
    this.photo = ''

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



  fetchEventsFotos(ID: number, page: number) {
    //console.log('ID Fetch Event Fotos: ', ID);
    this.isLoading = true;
    this.eventService
      .getEventDetailService(ID, page)
      .subscribe((eventosresponse: any) => {
        this.isLoading = false;
      //  console.log(eventosresponse, 'evento detalle');
        //this.fotosArray = eventosresponse;
        // console.log(' RESPONSE: ', eventosresponse);

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




  addToCart(fotos: Fotos, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
     this.cartService.addToCart(fotos);
     console.log( 'fotoadd' ,fotos)


     this.fotos = this.getFoto(fotos)
      console.log('fotosss' , this.fotos)
       this.getFoto(fotos)

  }




  getFoto(foto : any){

    let data = foto

    console.log( 'getfoto' , data)
    return data

  }

  setFoto = this.getFoto(this.fotos)


  onScroll() {
    console.log('estas haciendo scroll');
    if (!this.isLoading) {
     // console.log('actualPage: ', this.actualPage);

      this.nextPage = this.actualPage + 1;
      //console.log('nextPage: ', this.nextPage);

      //console.log('pide pagina siguiente: getEventPage() ');
      this.fetchEventsFotos(this.ID, this.nextPage);
    }
  }


  //(change)se activa cuando el usuario cambia la entrada






}
