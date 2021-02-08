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
  digital: String
  impresa: String

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    console.log('carrito getCart', this.cart)
    this.formaterStringBoolean()

  }

  deleteItemCart() {
    console.log('cart de delete de componente', this.cart)
    this.cartService.clearCart(this.cart)
  }

  updateCartItem(event, key) {
    // console.log('updateCartitem', event);
    //actualiza la cantidad de items del cart, event observa si el input cambia
    this.cartService.updateCantidad(key, event.target.value);
  }

  formaterStringBoolean() {

    let digital : String
    let impresa : String
    this.cart.forEach(element => {
      console.log(element.digital)

       if(element.digital == !!"1"){
        console.log('if')
        this.digital = "Digital"
         console.log('value if1', this.digital)

        }

     if(element.digital == !!"0"){
       console.log("if2")
        this.impresa = "Impresa"
        console.log('value if2' ,this.impresa)

       }



    });

    let value = [this.impresa , this.digital].toString()
    //console.log( 'ultimo value', value)

    return value

  }

}
