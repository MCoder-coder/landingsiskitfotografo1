import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  Object = Object;

  //(change)se activa cuando el usuario cambia la entrada

  cart = this.cartService.getCart();


  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    //console.log(this.itemsCart)
  }

  updateCartItem(event, key) {
   // console.log('updateCartitem', event);
   //actualiza la cantidad de items del cart, event observa si el input cambia
    this.cartService.updateCantidad(key, event.target.value as number);
  }
}
