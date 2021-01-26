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
    let getcarrito = this.cartService.getCart()


    console.log('foto de componente modal cart' , foto)
    console.log(`foto de itemcart` , this.itemCart)


    console.log('id de foto ItemCart' , this.itemCart.foto.ID)
    //console.log('id de foto : Fotos' , foto.foto.ID)

      for(const value of Object.values(getcarrito)){
        for(const val of Object.values(value)){
          for(const va of Object.values(val)){

            if (va.ID == this.itemCart.foto.ID) {
              console.log('va id' , va)
              isDuplicated = true
              break
            }
          }
        }
      }

    // for (const value of Object.values(foto)) {
    //     console.log('foto fot' , value.ID)

    //     if(value.ID == this.itemCart.foto.ID){
    //       console.log('value id' , value.ID )
    //       console.log('value itemcart' , this.itemCart.foto.ID)
    //        isDuplicated = true
    //        this.cartService.addToCart(this.itemCart)
    //       break

    //     }
    //  }

     if(!isDuplicated){
      console.log('no es duplicada')
      this.cartService.addToCart(this.itemCart )

     }




  }

}
