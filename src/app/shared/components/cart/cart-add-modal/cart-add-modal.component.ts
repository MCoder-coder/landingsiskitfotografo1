import { Foto } from './../../../../core/models/foto.model';
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



  addToCartFoto(){
    console.log("car-add-modal funcion addToCart");
    let  isDuplicated = false
    let getcarrito = this.cartService.getCart()


    //console.log('foto de componente modal cart' , foto)
    console.log('foto ID' , this.itemCart.foto.ID)
    console.log(`foto de itemcart` , this.itemCart)


    console.log('id de foto ItemCart' , this.itemCart.foto.ID)
    //console.log('id de foto : Fotos' , foto.foto.ID)

      for(const forCartItem of getcarrito){
          console.log('forCartItem' , forCartItem);
          console.log('forCartItem.foto' , forCartItem.foto);
          console.log('this.itemCart.foto.ID' , this.itemCart.foto.ID);
            if ( this.itemCart.foto.ID ==  forCartItem.foto.ID) {

              isDuplicated = true
              break
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
      this.cartService.addToCart(this.itemCart)

     }else{
      console.log('es duplicada')
     }




  }

}
