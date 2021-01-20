import { CartItem } from '../models/cartitem.model';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Fotos } from '../models/fotos.model';
import { LocalService } from "./local.service";
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
  constructor(private localService : LocalService) {
    // cargo el carrito desde el local storage
    this.loadLocalStorageCart();
    this.totalItems.next(this.getFotosCount());
  }

  loadLocalStorageCart() {
    //El método JSON.parse() analiza una cadena de texto como JSON, transformando opcionalmente  el valor producido por el análisis.
    //let myCart = JSON.parse(localStorage.getItem('cart'));
     //local service inyectado en el constructo key cart para obtener los datos este metodo desencripta los datos guardados
    //en localStorage
     let get =this.localService.getJsonValue('cart')
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
    this.localService.setJsonValue('cart' , this.cart)
   // let myCart = JSON.stringify(this.cart);
    //localStorage.setItem('cart', myCart);
  }

  addToCart(foto) {
    //this.cart.push(fotos);
    this.fotos.push(foto);

    let newCartitem: CartItem = <CartItem>{
      ID: 0,
      foto: foto,
      cantidad: 1,
      size: '15x18',
    };
    console.log('cart item', newCartitem);
    this.cart.push(newCartitem);
    console.log('cart', this.cart);

    this.updateLocalStorageCart();
    //método next para emitir valores en este caso las items sumados del cart
    this.totalItems.next(this.getFotosCount());
  }

  updateCantidad(key, nuevaCantidad: number) {
    this.cart[key].cantidad = nuevaCantidad;
    this.totalItems.next(this.getFotosCount());
    this.updateLocalStorageCart();
  }

  // getFotos() {
  //   return this.fotos;
  // }
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
      console.log(item.cantidad);
      //suma el total que es igual a 0 por la la cantidad de item dentro del carrito
      total = Number(total) + Number(item.cantidad);
    }
    return total;
  }

  getTotalItemsObserver() {
    return this.totalItems;
  }
}
