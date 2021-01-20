import { Component, OnInit } from '@angular/core';
import { CartService } from "../../../core/services/cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  Object = Object


  cart = this.cartService.getCart()

   data = localStorage.getItem('foto')
  constructor( private cartService : CartService) { }

  ngOnInit(): void {
    //console.log(this.itemsCart)
  }


  updateCartItem(event , key){
    console.log("updateCartitem" ,event)
      this.cartService.updateCantidad(key , event.target.value as number)
  }


}
