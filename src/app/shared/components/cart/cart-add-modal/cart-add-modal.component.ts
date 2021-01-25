import { Fotos } from './../../../../core/models/fotos.model';
import { CartService } from './../../../../core/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { flatten } from '@angular/compiler';


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

    let  isDuplicated = false


    for (let index = 0; index < this.itemCart.length; index++) {
      for (let index = 0; index < foto.length; index++) {

        if (this.itemCart[index] == foto[index]) {
            console.log('if')
        }

      }
    }


    // if (this.itemCart.foto.ID  == this.itemCart.foto.ID) {
    //   isDuplicated = true
    //   console.log('if' , isDuplicated)
    //   this.cartService.addToCart(this.itemCart)
    // }else{
    //   isDuplicated = false







  }

}
