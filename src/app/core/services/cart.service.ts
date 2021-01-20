import { CartItem } from '../models/cartitem.model';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Fotos } from '../models/fotos.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private fotos: Fotos[] = [];
  private cart: CartItem[] = [];
  private tempCartItem: CartItem;
  private totalItems: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {
    // cargo el carrito desde el local storage
    this.loadLocalStorageCart();
    this.totalItems.next(this.getFotosCount());
  }

  loadLocalStorageCart() {
    let myCart = JSON.parse(localStorage.getItem('cart'));
    if (!myCart) {
      this.cart = [];
    } else {
      this.cart = myCart;
    }
  }

  updateLocalStorageCart() {
    let myCart = JSON.stringify(this.cart);
    localStorage.setItem('cart', myCart);
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

      total = Number(total) + Number(item.cantidad);
    }
    return total;
  }

  getTotalItemsObserver() {
    return this.totalItems;
  }
}
