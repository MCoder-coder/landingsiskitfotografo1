import { Size} from './../../../core/models/sieze.model'

import { Fotos } from './../../../core/models/fotos.model';
import { Foto } from './../../../core/models/foto.model';
import { Events } from './../../../core/models/events.model';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Event, Params } from '@angular/router';

import { EventsService } from '../../../core/services/events.services';

import { from, Observable } from 'rxjs';
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
import { CartAddModalComponent } from 'src/app/shared/components/cart/cart-add-modal/cart-add-modal.component';

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
  newItemCart : CartItem

  //BsModalService nos permite abrir el modal

  constructor(
    private route: ActivatedRoute,
    private eventService: EventsService,
    private modalService: BsModalService,
    private cartService: CartService
  ) {
    // console.log(this.route.snapshot.paramMap.get('id/page'));

    this.fotosArray = [];
    this.page = 0;
    this.actualPage = 0;
    this.nextPage = 1;
    this.isLoading = false;
    this.photo = '';

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

  // addToCart(cartItem: Fotos) {
  //   //this.modalRef = this.modalService.show(template);

  //   //leer formulario pop up

  //   //completar cartItem / actualizar

  //   this.cartService.addToCart(cartItem);
  //   console.log('fotoadd', cartItem);

  //   //   this.getFotos(fotos)
  // }

  //modal para preferencias de la fotos para el carrito
  addToCartPopUp(foto: Foto) {
    //existe en el carrito?
    //una variable asignada al modelos CarItem que obtiene de la funcion firstNew la foto seleccionada , este metodo compara si la fotos son iguales, para poder mostrar una sola y no ambas
    this.newItemCart = this.firstOrNew(foto);
    console.log('newCartItem addTOcarModal', this.newItemCart);
    //initialState lo inicializo en appModule
    const initialState = {
      itemCart: this.newItemCart,
    };
    console.log('initialState', initialState);
    //muestro el modal paso el nombre del Componente modal y paso los datos en initialState para mostrar los datos
    this.modalRef = this.modalService.show(CartAddModalComponent, {
      initialState,
    });
  }

  //primer foto seleccionada
  firstOrNew(foto: Foto): CartItem {
    //console.log('functionFirsOnNew', foto);
    // throw new Error('Method not implemented.');

    //let size = ["15x18" , "30x40", "40x50"]
    let size = []

    // tempCarte almacenos los datos obtenidos en una variable temporal : getCart servicio de CartService obtiene los datos de carrito
    let tempCart = this.cartService.getCart();
    console.log('tempCart', tempCart);
    // for (let index = 0; index < tempCart.length; index++) {
    //   let tempCar = tempCart[index].size
    //   //recorro el array cart hago una comparacion del id de la fotografia basandome en el modelo
    //   //en this.cart obtengo el index la ubiacion del array y los comparo con el foto id dentro de este array
    //   //si el booleano es true osea el id duplicado en ambos detengo el bucle para no seguir agregando datos
    //   if (foto.ID == tempCart[index].foto.ID ) {
    //     //comparo la foto.id con el el objeto temCart con el indice ID si estos son iguales returno tempcart el ID de la foto seleccionada
    //     console.log('tempaCarIf', tempCart[index]);
    //     return tempCart[index];
    //   }




    // }






    //creo un objeto basandome en el modelo carro
    let newCartitem: CartItem = <any>{
      ID: 0,
      foto: foto,
      cantidad: 1,
      size,
      digital : 1,
    };

    console.log('tempCartIf', newCartitem);
    return newCartitem;
    //y retfotomo datos de este modelo
    //la comparacion del if es para obtenes una sola foto en este caso la dle modelo carro y no la del modelo fotos
  }



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
