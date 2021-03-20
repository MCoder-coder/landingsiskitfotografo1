import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import {
  faCoffee,
  fas,
  faShoppingCart,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { CartItem } from 'src/app/core/models/cartitem.model';
import { ConfirmationDialogService } from 'src/app/shared/confirmation-dialog/confirmation-dialog.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  Object = Object;
  googleIcon = faTrash;
  //(change)se activa cuando el usuario cambia la entrada
  Cart: CartItem[] = [];
  cart = this.cartService.getCart();
  digital: String
  impresa: String

  constructor(private cartService: CartService, private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit(): void {
    console.log('carrito getCart', this.cart)
    this.formaterStringBoolean()

  }


  /**
   *
   * @param index
   *
   * Metodo que se encarca de eliminar el item del cart
   * a traves de su index
   */

  deleteItemCart(index) {
    this.cartService.deleteItem(index)
    console.log(  "delteCartComponent" ,index)
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

  opdenDialogConfirm(index: number) {
    this.confirmationDialogService.confirm('', 'Esta seguro que desea Eliminar esta Foto')
      .then((confirmed) => this.deleteItemCart(index) + '' + confirmed)
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
