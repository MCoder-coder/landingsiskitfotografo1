import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import {
  faCoffee,
  fas,
  faShoppingCart,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { CartItem } from 'src/app/core/models/cartitem.model';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation-dialog.service';
import { CartModalDialogService } from 'src/app/core/services/cart.modal.service';
import { Fotos } from 'src/app/core/models/fotos.model';
import { Foto } from 'src/app/core/models/foto.model';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  Object = Object;
  googleIcon = faTrash;
  //(change)se activa cuando el usuario cambia la entrada

  fotos: Fotos[] = [];
  Cart: CartItem[] = [];

  cart = this.cartService.getCart();
  cartUnique = this.cartService.getCartUnique();

  digital: String
  impresa: String

  constructor(private cartService: CartService, private confirmationDialogService: ConfirmationDialogService ) { }

  ngOnInit(): void {
    console.log('carrito getCart', this.cart)
    this.formaterStringBoolean()

    console.log("cart 000" , this.cartService.getCartUnique())

  }




  cartOpenModal(foto : Foto){


        return this.cartService.addToCartPopUp(foto)


    //this.cartModalService.cartOpenDialogModal()

  }



  /**
   *
   * @param index
   *
   * Metodo que se encarca de eliminar el item del cart
   * a traves de su index
   */

  deleteItemCart(fakeCart) {
        console.log("tachito de carro real" , fakeCart)




        console.log("valor despues del carro real", fakeCart)

        // for (let index = 0; index < this.cartUnique.length; index++) {
        //     const element = this.cartUnique[index];
        //     console.log("tachito.length" , element)
        //     //this.cartService.deleteAllFakeCart(fakeCart.length)
        // }
        //this.toastr.error("Hubo un Error al Intertar eliminar todas la copias")

        console.log(  "tachito" ,fakeCart)
  }

  /**
  *
  * @param index
  *
  * Metodo opendDialogCOnfirm
  * abre un dialgo de confirmacion o cancelacion
  * Si la confirmacion es true , entonces elimina la foto basandose en el parametro
  * index(ubicacion de la foto dentro del array), foto que se encuentra en el cartItem o Modal, para la eliminacion utilizo el
  * metodo delete()
  * //El metodo then utiliza una arraw function "confirmed" si es true elimina el item del cart y modal
  * this.delete() metodo que se encanga de la eliminacion por index de la foto del modal
  *
  * Si es false no hace nada se cancela
  *
  */

  opdenDialogConfirm(fakeCart) {
    this.confirmationDialogService.confirm('', 'Esta seguro que desea Eliminar esta Foto')
      .then((confirmed) => this.deleteItemCart(fakeCart) + '' + confirmed)
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
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
