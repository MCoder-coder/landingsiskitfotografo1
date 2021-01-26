import { CartItem } from '../models/cartitem.model';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Fotos } from '../models/fotos.model';
import { LocalService } from './local.service';
import { Local } from 'protractor/built/driverProviders';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private fotos: Fotos[] = [];
  private cart: CartItem[] = [];
  private tempCartItem: CartItem;
  //Behaviour Subject nos permite utilizar una característica realmente útil y que es la de poder "recodar¨ el último valor emitido por el Observable a todas las nuevas subscripciones, al margen del momento temporal en que éstas se establezcan
  private totalItems: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  //inyecto servicio de encriptacion para acceder a sus metodos
  constructor(private localService: LocalService) {
    // cargo el carrito desde el local storage
    this.loadLocalStorageCart();
    this.totalItems.next(this.getFotosCount());
  }

  loadLocalStorageCart() {
    //El método JSON.parse() analiza una cadena de texto como JSON, transformando opcionalmente  el valor producido por el análisis.
    //let myCart = JSON.parse(localStorage.getItem('cart'));
    //local service inyectado en el constructo key cart para obtener los datos este metodo desencripta los datos guardados
    //en localStorage
    let get = this.localService.getJsonValue('cart');
    // console.log( 'get' , get)
    if (!get) {
      //si el carrito esta vacio
      this.cart = [];
    } else {
      //sino el carrito esta llenos
      this.cart = get;
    }
  }

  updateLocalStorageCart() {
    //El JSON.stringify()método convierte un objeto o valor de JavaScript en una cadena
    this.localService.setJsonValue('cart', this.cart);
    // let myCart = JSON.stringify(this.cart);
    //localStorage.setItem('cart', myCart);
  }

  addToCart(foto: Fotos) {
    //this.cart.push(fotos);
    let isDuplicate = false;

    //  this.fotos.push(foto);
    // console.log('cart push' ,this.fotos.push(foto) )

    //modelo de cart
    let newCartitem: CartItem = <CartItem>{
      //ID: 0,
      foto: foto,
      cantidad: 1,
      size: '15x18',
    };
    //console.log('cart item', newCartitem);
    //agrego datos del model en this.cart
    console.log('fuera del if' , foto)
    console.log('fuera del if cart' , this.cart)
    //console.log('newCartItem de service' , newCartitem)
    for (let index = 0; index < this.cart.length; index++) {
      //recorro el array cart hago una comparacion del id de la fotografia basandome en el modelo
      // en this.cart obtengo el index la ubiacion del array y los comparo con el foto id dentro de este array
      //si el booleano es true osea el id duplicado en ambos detengo el bucle para no seguir agregando datos
        console.log('dentro del fot itemcart service' , this.cart[index].foto)
       if (foto.foto.ID == this.cart[index].foto.ID ) {
         isDuplicate = false;
         console.log('primer if', foto.ID);
         break;
       }
     }

     
    //this.cart.push(newCartitem);
    // //console.log('segundo if')
    // this.updateLocalStorageCart();

     //this.totalItems.next(this.getFotosCount());

       if (!isDuplicate) {
        this.cart.push(newCartitem);
        this.updateLocalStorageCart();
         this.totalItems.next(this.getFotosCount());
     }
  }

  updateCantidad(key, nuevaCantidad: number) {
    this.cart[key].cantidad = nuevaCantidad;
    this.totalItems.next(this.getFotosCount());
    this.updateLocalStorageCart();
  }

  getCart() {
    return this.cart;
  }

  clearCart() {
    this.fotos = [];
    this.cart = [];

    this.updateLocalStorageCart();

    this.totalItems.next(this.getFotosCount());
  }

  getFotosCount() {
    //return this.cart.length;
    let total: number = 0;
    for (let item of this.cart) {
     // console.log(item.cantidad);
      //suma el total que es igual a 0 por la la cantidad de item dentro del carrito
      total = Number(total) + Number(item.cantidad);
    }
    return total;
    //retorno el total de la suma
  }

  getTotalItemsObserver() {
    return this.totalItems;
  }
}
