import { Fotos } from './../../../../core/models/fotos.model';
import { CartService } from './../../../../core/services/cart.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-cart-add-modal',
  templateUrl: './cart-add-modal.component.html',
  styleUrls: ['./cart-add-modal.component.css']
})
export class CartAddModalComponent implements OnInit {

  //variable para obtener los datos de la primera foto obtenida y mostrarla en el modal
  itemCart

  constructor(private cartService : CartService) { }

  ngOnInit(): void {
  }



  addToCartFoto(foto : Fotos){

    let isDuplicate : false
    let cartitemAdd = this.cartService.getCart()

    console.log('paso por el for' , this.itemCart)
    console.log('foto addto cart' , foto)
    for (let index = 0; index < this.itemCart.length; index++) {

        if (foto.ID === this.itemCart[index].foto.ID) {

          isDuplicate = false

          break
        }


    }

    if (!isDuplicate) {
      this.cartService.addToCart(this.itemCart)
      console.log('if de duplicado global' , this.itemCart)
    }



  }

}
