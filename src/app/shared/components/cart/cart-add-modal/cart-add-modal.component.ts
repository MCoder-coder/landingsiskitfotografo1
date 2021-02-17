
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Foto } from './../../../../core/models/foto.model';
import { CartService } from './../../../../core/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { flatten, ThrowStmt } from '@angular/compiler';
import {
  faCoffee,
  faCopy,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FormGroup } from '@angular/forms';
import { Size } from '../../../../core/models/sieze.model';
import { CartItem } from '../../../../core/models/cartitem.model';
import { elementAt, timestamp } from 'rxjs/operators';
import { newArray } from '@angular/compiler/src/util';
import { isObject } from 'util';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from 'src/app/shared/confirmation-dialog/confirmation-dialog.service';
import { inflate } from 'zlib';
import { type } from 'os';

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
  selecteSize = ["15x18", "30x40", "40x50"];
  // selectedSize2 = ["15x18", "30x40", "40x50"];

  //(change)se activa cuando el usuario cambia la entrada

  cart = this.cartService.getCart();

  constructor(private cartService: CartService, private formBuilder: FormBuilder, private confirmationDialogService: ConfirmationDialogService) {
    //creo el formulario
    this.buildOptionForm()


  }

  ngOnInit(): void {
    console.log('save form', this.MainForm.value)
    //console.log('itemcar Size' , this.itemCart.size)

    //this.itemCart.size = this.selectedSize


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
    console.log("MainForm: ", this.MainForm)
  }

  /**
   * Metodo que crea las opciones del formulario de optionselect
   *
   */
  //creo los campos
  createOptionForm() {
    //let itemCar = this.itemCart
    //console.log('itemcar' , itemCar)

    let newFormGroup = this.formBuilder.group({
      //  "type": this.formBuilder.control({value:"0"}),
      //  "size": this.formBuilder.control({value:"15x18"}),
      //  "cantidad": this.formBuilder.control({value:itemCar.cantidad}),


    })

    console.log('newFormGroup', newFormGroup)
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

    let newCartItem: CartItem = <any>{
      ID: this.fakeCart[0].foto.ID + "-" + (this.fakeCart.length + 1),
      foto: this.fakeCart[0].foto,
      cantidad: 1,
      size: "",
      digital: 1,
    };
    //console.log('newCartItem' , newCartItem)
    this.fakeCart.push(newCartItem)
    //this.optionSelect.push(newCartItem)


  }

  //obtiene el formularios de copia y los caste a un formArray para poder usar las directivas formControlName y formControlArray
  get optionSelect() {
    return this.MainForm.get('optionselect') as FormArray
  }

  /**
   *
   *
   * Elimina el formulario de copia
   * Para el metodo recibe un objeto CarItem (corespondiente a su index)
   * Busco en el cart real si existe el ID carItem y Busco en el Cart falso el ID Hago su comparacion si son iguales(ej:654654)
   * (Si los ID son iguales){
   *    entonce (SI index > -1){
   *    resto un item del cart y modal
   *    this.fakeCart "de este carrito falso"
   *    splice("basandome en el index que se encuentra el item del Modal!!!" , 1 elimino un elemento)
   * //Metodo creado en cart Service para poder eliminar los item del Cart
   *    this.cartService.deleteitem("Dependiendo de la ubicacion del index elimino el elemento")
   * //Despues de ejecutar la eliminacion del el elemento Index(CartItem y fakeCart) retorno el fakeCart actualizado
   *    con el nuevo array sin los item quitados.
   *
   * -----------------------------------------------------------------------------------------------------------
   *
   * Si en todo caso el usuario agruega un elemento form que no se encuentre en el carro y lo desea eliminar
   *(SI index > -1){
   *    resto un item del cart y modal
   *    this.fakeCart "de este carrito falso"
   *    splice("basandome en el index que se encuentra el item del Modal!!!" , 1 elimino un elemento)
   *
   * retorno this.fakeCart los elementos falso del form y vuelvo a actualizar los campos que se encuentran en el fakeCart
   * //ahora eliminos este elemento del formulario...
   *
   */

  delete(index: number) {

    let cartFake = this.fakeCart
    let cartItme = this.itemCart
    console.log('cartItme', cartItme)
    console.log('cartFake', cartFake)

    for (let j = 0; j < this.fakeCart.length; j++) {
      let fake = this.fakeCart[j];
      for (let h = 0; h < this.cart.length; h++) {
        let cart = this.cart[h];
        if (fake.ID == cart.ID) {
          if (index > -1) {
            //El método splice() cambia el contenido de un array eliminando elementos existentes
            // this.fakeCart.splice(index, 1);
            this.fakeCart.splice(index, 1);
            this.cartService.deleteItem(index)

            return this.fakeCart
          }

        }

      }

      if (index > -0) {
        this.fakeCart.splice(index, 1);
        return this.fakeCart
      }


    }


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
      .then((confirmed) => this.delete(index) + '' + confirmed)
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
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

  typeChange(event , indx) {
    console.log('event', event)
    console.log('index', indx)

    let type_el = event.target;
    console.log('type_el' , type_el)
    var id = document.getElementById("item")
    console.log('id' , id)

    let hiddenClassName = 'inputHidden'
    var nodesQuerySelector = document.getElementsByClassName(hiddenClassName)

    for (let index = 0; index < nodesQuerySelector.length; index++) {
      var nodeQuerySelector = nodesQuerySelector[index];
      var classCOntainsShow = nodeQuerySelector.classList.contains('show')
      console.log('nodehtml',nodeQuerySelector)


        if (type_el.value == 0) {
          if (classCOntainsShow  ) {

          } else {
            nodeQuerySelector.classList.add('show')

          }
        }

        if (type_el.value == 1) {
          if (classCOntainsShow ) {

            nodeQuerySelector.classList.remove('show')

          }
        }



    }

  }



}
