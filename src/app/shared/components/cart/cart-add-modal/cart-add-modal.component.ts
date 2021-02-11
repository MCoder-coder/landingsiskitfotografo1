
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Foto } from './../../../../core/models/foto.model';
import { CartService } from './../../../../core/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { flatten } from '@angular/compiler';
import {
  faCoffee,
  faCopy,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FormGroup } from '@angular/forms';
import { Size } from '../../../../core/models/sieze.model';
import { CartItem } from '../../../../core/models/cartitem.model';
import { timestamp } from 'rxjs/operators';
import { newArray } from '@angular/compiler/src/util';

@Component({
  selector: 'app-cart-add-modal',
  templateUrl: './cart-add-modal.component.html',
  styleUrls: ['./cart-add-modal.component.css'],



})
export class CartAddModalComponent implements OnInit {

  //variable para obtener los datos de la primera foto obtenida y mostrarla en el modal
  itemCart
  fakeCart: CartItem[] = [];
  Object = Object;
  MainForm: FormGroup;
  googleIcon = faTrash;
  copyIcon = faCopy;
  selectedSize = ["15x18", "30x40", "40x50"];
 // selectedSize2 = ["15x18", "30x40", "40x50"];

  //(change)se activa cuando el usuario cambia la entrada

  cart = this.cartService.getCart();

  constructor(private cartService: CartService, private formBuilder: FormBuilder) {
    //creo el formulario
    this.buildOptionForm()


  }

  ngOnInit(): void {
    console.log('save form', this.MainForm.value)
    //console.log('itemcar Size' , this.itemCart.size)

    // this.itemCart.size = this.selectedSize


  }

  //formulario de opciones, pop up
  /**
   * Creo un metodo privado para construir un formArray
   *    //this.MainForm : FormFG
   *      **creo un grupo de formulario optionSelect de tipo array porque
   */
  private buildOptionForm() {
    this.MainForm = this.formBuilder.group({
      optionselect: this.formBuilder.array([])
    })
    console.log("MainForm: " , this.MainForm)
  }

  /**
   * Metodo que crea las opciones del formulario de optionselect
   *
   */
  //creo los campos
  createOptionForm() {
    let itemCar = this.itemCart
    console.log('itemcar' , itemCar)

    let newFormGroup = this.formBuilder.group({
      //  "type": this.formBuilder.control({value:"0"}),
      //  "size": this.formBuilder.control({value:"15x18"}),
      //  "cantidad": this.formBuilder.control({value:itemCar.cantidad}),

    })

    console.log('newFormGroup' , newFormGroup)
    return newFormGroup;
  }
  /**
   * *Agrego las opciones del formulario
   *  //Creo la instante de CartItem con sus respectivos valores
   *      *asigo el id de la foto al ID del CartItem
   *      *obtengo el ID de la foto[0] siempre sera la misma foto
   *      *la cantidad uno
   *      *size "" de tipo string vacion
   *      *digital boolean true = 1
   * //Hago referencia a fakeCartItem es una variable global de tipo CartItem asignada a un Array
   *    *esta variable ejecuta el metodo push
   *    *El método push() añade uno o más elementos al final de un array y devuelve la nueva longitud del array.
   *    *Dentro del metodo push asigno la instancia del Objeto newCartItem y añado una nueva instancia del newCarItem creo un
   *     una instancia nueva cada vez que ejecuto el metodo push.
   *
   */
  //agruega la nueva opciones medida,digital,impresa,input, del formulario bansandome en el objeto itemCart
  addOptionForm() {
    // this.optionSelect.push(this.createOptionForm())
    let newCartItem: CartItem = <any>{
      ID: this.fakeCart[0].foto.ID+"-"+(this.fakeCart.length+1),
      foto: this.fakeCart[0].foto,
      cantidad: 1,
      size: "",
      digital : 1,
    };
    console.log('newCartItem' , newCartItem)
    this.fakeCart.push(newCartItem)
    //this.optionSelect.push(newCartItem)

  }

  //obtiene el formularios de copia y los caste a un formArray para poder usar las directivas formControlName y formControlArray
  get optionSelect() {
    return this.MainForm.get('optionselect') as FormArray
  }

  /**
   *
   * @param index
   * Elimina el formulario de copia
   * Para el metodo recibe un objeto CarItem (corespondiente a su index)
   * Buscar en el cart real si existe el ID carItem (ej:654654)
   * Si existe: pregunta si desea eliminarlo
   *   Elimino el cartitem del carro real Buscandolo por CartItem.Id
   * Sino no hace nada
   *
   * //ahora eliminos el formulario...
   * Obtengo el objeto de "fakeCart"
   */

  delete(index: number) {
    this.cart = new Array<CartItem>()
    //this.optionSelect.removeAt(index)
    for (let j = 0; j < this.cart.length; j++) {
      let element = this.cart[j];
      //id = element

      console.log('element', element)
    }
    console.log('remove' , index)
  }



  /**
   *
   * @param fakeCart
   * Agrego las fotos de fakeCart
   * Obtengo el metodo de CartService ,inyeccion de dependencia para acceder al metodo
   * //llamo al metodo mergeCartItems
   * // que mescla el carrito falso con el real, agregando los cambios sin duplicar nada
   *
   */
  addToCartFoto(fakeCart) {

    this.cartService.mergeCartItems(fakeCart)

  }



/**
 *
 * @param event
 * @param key
 *
 * Metodo que actualiza la cantidad de elementos del Carro
 * Obtengo el metodo UpdateCantidad del service : CartService
 *    Inyeccion de dependencia en el constructor
 * //Paramentros Key y event
 *    Dependiendo que tipo de key tenga el campo , el paramentro:
 *    event observa si el input cambia
 */
  updateCartItem(event, key) {

    // console.log('updateCartitem', event);
    //actualiza la cantidad de items del cart, event observa si el input cambia
    this.cartService.updateCantidad(key, event.target.value);

  }

  /**
   *
   * @param event
   * Metodo que observa los cambios del select
   * //Si es digital o impresa este se ocultao muestra
   *    compara el value tru o false de digital este es Boolean
   * //clase html|css inputHidden
   *      *si el valor es 0 se muestra : 0  Impresa
   *      *si el valor es 1 se muestra : 1 Digital
   */
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
