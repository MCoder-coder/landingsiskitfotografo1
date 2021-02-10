
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Foto } from './../../../../core/models/foto.model';
import { CartService } from './../../../../core/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { flatten } from '@angular/compiler';
import {
  faCoffee,
  fas,
  faShoppingCart,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FormGroup } from '@angular/forms';
import { Size } from '../../../../core/models/sieze.model';
import { CartItem } from '../../../../core/models/cartitem.model';

@Component({
  selector: 'app-cart-add-modal',
  templateUrl: './cart-add-modal.component.html',
  styleUrls: ['./cart-add-modal.component.css'],



})
export class CartAddModalComponent implements OnInit {

  //variable para obtener los datos de la primera foto obtenida y mostrarla en el modal
  itemCart
  Object = Object;
  form: FormGroup;
  googleIcon = faTrash;
  selectedSize = ["15x18", "30x40", "40x50"];
 // selectedSize2 = ["15x18", "30x40", "40x50"];

  //(change)se activa cuando el usuario cambia la entrada

  cart = this.cartService.getCart();

  constructor(private cartService: CartService, private formBuilder: FormBuilder) {
    this.buildOptionForm()


  }

  ngOnInit(): void {
    console.log('itemCart modal size', this.itemCart.size)
    console.log('save form', this.form.value)
    //console.log('itemcar Size' , this.itemCart.size)

    this.itemCart.size = this.selectedSize


  }

  //formulario de opciones, pop up
  private buildOptionForm() {
    this.form = this.formBuilder.group({
      optionselect: this.formBuilder.array([])
    })
  }

  //creo los campos
  createOptionForm() {
    let itemCar = this.itemCart
    console.log('itemcar' , itemCar)
    return this.formBuilder.group({
      itemCar,


    })
  }

  //agruega la nueva opciones medida,digital,impresa,input, del formulario bansandome en el objeto itemCart
  addOptionForm() {
    this.optionSelect.push(this.createOptionForm())

  }

  //obtiene el formularios de copia
  get optionSelect() {
    return this.form.get('optionselect') as FormArray
  }
  delete(index: number) {
    this.optionSelect.removeAt(index)
  }

  addToCartFoto(item) {
    console.log('item ', item)
    console.log("car-add-modal funcion addToCart");
    let isDuplicated = false
    let getcarrito = this.cart


    //console.log('foto de componente modal cart' , foto)
    //console.log('foto size' , this.itemCart.size)
    console.log(`foto de itemcart`, this.itemCart)


    console.log('id de foto ItemCart', this.itemCart.foto.ID)
    //console.log('id de foto : Fotos' , foto.foto.ID)

    // for (const forCartItem of getcarrito) {
    //   console.log('forCartItem', forCartItem);
    //   console.log('forCartItem.foto', forCartItem.size);
    //   console.log('this.itemCart.foto.ID', this.itemCart.foto.ID);
    //   // if (this.itemCart.foto.ID == forCartItem.foto.ID) {

    //   //   isDuplicated = true
    //   //   break
    //   // }




    // }




    for (let i = 0; i < this.selectedSize.length; i++) {
      let selecSize = this.selectedSize[i];
      console.log('selectSizefor' , selecSize)
      for (let j = 0; j < getcarrito.length; j++) {
        let sizeCart = getcarrito[j];
        console.log('sizeCart segundo for', sizeCart)

         if(selecSize[i] === sizeCart.size[i]){
            console.log('son iguales las medidas')
            isDuplicated = true;
            break;
         }else{
           isDuplicated = false
         }

      }
    }

    // for (let d = 0; d < getcarrito.length; d++) {
    //   let digital = getcarrito[d];
    //   let size = []
    //       if (digital.digital === true){

    //         console.log( 'digital', digital)
    //         digital.cantidad = 1
    //         digital.size = size[""]
    //         this.itemCart.size = size[""]

    //       }else{

    //       }

    // }



    if (!isDuplicated) {
      console.log('no es duplicada')

      //this.cartService.addToCart(this.itemCart)
     console.log('addTocart', this.cartService.addToCart(this.itemCart))

    } else {
      console.log('es duplicada')
      console.log('addTocart', this.cartService.addToCart(this.itemCart))
    }


  }

  groupByFieldOption(event, index) {
    console.log(event, index);
  }

  trackByFn(index, item) {
    return index;
  }
  updateCartItem(event, key) {
    // console.log('updateCartitem', event);
    //actualiza la cantidad de items del cart, event observa si el input cambia
    this.cartService.updateCantidad(key, event.target.value);
  }

  typeChange(event) {
    console.log('event', event)

    let type_el = event.target

    console.log('type_el', type_el)
    //es impresa?
    if (type_el.value == 0) {
      let ty = document.getElementsByClassName('inputHidden')
      //console.log('ty', ty)
      for (let index = 0; index < ty.length; index++) {
        const element = ty[index];
        //console.log('element', element)
        if (element.classList.contains('show')) {

        } else {
          element.classList.add('show')
        }

      }


    }

    if (type_el.value == 1) {
      let ty = document.getElementsByClassName('inputHidden')

      for (let index = 0; index < ty.length; index++) {
        const element = ty[index];
        //console.log('element 1', element)
        if (element.classList.contains('show')) {
          element.classList.remove('show')
        }
      }

    }

  }



}
