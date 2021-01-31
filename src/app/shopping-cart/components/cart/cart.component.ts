import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import {
  faCoffee,
  fas,
  faShoppingCart,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  Object = Object;
  googleIcon = faTrash;
  //(change)se activa cuando el usuario cambia la entrada

  cart = this.cartService.getCart();


  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    console.log(  'carrito getCart' , this.cart)
  }

  deleteItemCart(){
    console.log( 'cart de delete de componente' ,this.cart)
    this.cartService.clearCart(this.cart)
  }

  updateCartItem(event, key) {
   // console.log('updateCartitem', event);
   //actualiza la cantidad de items del cart, event observa si el input cambia
    this.cartService.updateCantidad(key, event.target.value);
  }
}
