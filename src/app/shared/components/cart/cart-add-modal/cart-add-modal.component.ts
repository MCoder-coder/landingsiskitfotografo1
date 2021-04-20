import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Foto } from './../../../../core/models/foto.model';
import { CartService } from './../../../../core/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { flatten, ThrowStmt } from '@angular/compiler';
import { faCopy, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormGroup } from '@angular/forms';
import { Size } from '../../../../core/models/sieze.model';
import { CartItem } from '../../../../core/models/cartitem.model';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation-dialog.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { isEmpty } from 'rxjs/operators';

@Component({
    selector: 'app-cart-add-modal',
    templateUrl: './cart-add-modal.component.html',
    styleUrls: ['./cart-add-modal.component.scss'],
})
export class CartAddModalComponent implements OnInit {
    //variable para obtener los datos de la primera foto obtenida y mostrarla en el modal
    initialState;
    tempFoto;
    itemCart;
    fakeCart: CartItem[] = [];
    Object = Object;
    MainForm: FormGroup;
    googleIcon = faTrash;
    copyIcon = faCopy;
    selecteSize = ['15x18', '30x40', '40x50'];
    disabledbutton: boolean;
    // selectedSize2 = ["15x18", "30x40", "40x50"];

    //(change)se activa cuando el usuario cambia la entrada

    cart = this.cartService.getCart();

    constructor(
        private cartService: CartService,
        private formBuilder: FormBuilder,
        private confirmationDialogService: ConfirmationDialogService,
        public toastr: ToastrService,

        private activeModal: NgbActiveModal,
        private modalService: BsModalService
    ) {
        //creo el formulario
        this.buildOptionForm();
    }

    ngOnInit(): void {
        //console.log('save form', this.MainForm.value);
        //console.log('itemcar Size' , this.itemCart.size)
        //console.log("itemCar init" , this.fakeCart)
        //console.log("tempFOto" , this.initialState)
        //console.log('fake car ngONinit', this.fakeCart);
    }

    //formulario de opciones, pop up
    /**
     * Creo un metodo privado para construir un formArray
     *    //this.MainForm : FormFG
     *      **creo un grupo de formulario optionSelect de tipo array porque
     */
    private buildOptionForm() {
        this.MainForm = this.formBuilder.group({
            optionselect: this.formBuilder.array([]),
        });
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
        });

        //		console.log('newFormGroup', newFormGroup)
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
        let tempFotoID = this.tempFoto.ID;
        let tempFoto = this.tempFoto;
        // console.log("tempfoto", tempFoto)
        let newCartItem: CartItem = <any>{
            ID:
                tempFotoID +
                '-' +
                (this.fakeCart.length + 1) +
                new Date().getUTCMilliseconds(),
            foto: tempFoto,
            cantidad: 1,
            size: '',
            digital: "0",
        };
        console.log('newCartItem', newCartItem);



        this.fakeCart.push(newCartItem);
        //this.optionSelect.push(newCartItem)
        for (let index = 0; index < this.fakeCart.length; index++) {
            const element = this.fakeCart[index];

            let seleccionTam = document.getElementById('select-tipo-formato-' + index)
            let campos_ocultos = document.getElementById(
                'contenedor-de-campos-ocultables-' + index
            );
            if (seleccionTam != null) {
                let dos = (<HTMLInputElement>document.getElementById('select-tipo-formato-' + index)).value;
                var classContainsShow = campos_ocultos.classList.contains('inputHidden');
                //console.log("dos" , dos)
                //console.log("add Opciones de form" , seleccionTam)

            }

        }

    }

    public dismiss() {
        this.modalService.hide();
    }

    //obtiene el formularios de copia y los caste a un formArray para poder usar las directivas formControlName y formControlArray
    get optionSelect() {
        return this.MainForm.get('optionselect') as FormArray;
    }


    /**
     * Delete All borra todas las fotos del fake cart
     *
     *
     */

    deletAll(fakeCart) {

        //parametro le asigno los items de this.fakeCart("carrito falso")
         fakeCart = this.fakeCart
        console.log("values de fake" ,  fakeCart)
        //si el contenido del fake cart esta lleno elimino todas las fotos
        if (fakeCart) {
            //borro todos los elemento del fake cart = splice 0
            this.fakeCart.splice( fakeCart ,0)
            //borro todas las fotos copia del carrito real
            this.cartService.deleteAllFakeCart(fakeCart)

            console.log("values dsp de delete", fakeCart)
            // mensaje de informacion de eliminacion de las copias
            this.toastr.info("Se Eliminaron todas las copias ")
            this.dismiss()

        } else {
            console.log("value else", fakeCart)
            //mensaje de error si fallaron a eliminarse todas las copias
            this.toastr.error("Hubo un Error al Intertar eliminar todas la copias")
        }


    }


    /**
     * Dialogo pop up de confirmacion de todas las fotos
     *
     * @param cartItem
     */
    opdenDialogConfirmDeleteAll(cartItem) {
        this.confirmationDialogService
            .confirm('', 'Esta seguro que desea Eliminar Todas Las Copias')
            .then((confirmed) => this.deletAll(cartItem) + '' + console.log(confirmed))
            .catch(() =>


                console.log(
                    'User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'
                )
            );


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


    delete(cart: CartItem) {
        //console.log('medoto cart-add-modal.component@delete()');
        let cartFake = this.fakeCart;

        //console.log('Objeto CartItem para borrar', cart);
        //console.log('cartFake', cartFake);

        //Borro en FakeCart
        for (let h = 0; h < cartFake.length; h++) {
            let cartfakeSelected = cartFake[h];
            //console.log("cart splice modal" , cartfake)
            if (cartfakeSelected.ID === cart.ID) {
                this.fakeCart.splice(h, 1);
                //console.log('FakeCart despues de borrar: ', this.fakeCart);

                //this.cartService.deleteModalitem(cartfakeSelected.ID)
                // console.log("cartService despues de borrar: ", this.cartService.getCart())
            }
            // console.log("delete service modal" , this.cartService.deleteModalitem(cart))

            //onsole.log("delete modal cartfake ID "  )
        }

        return this.fakeCart;
    }

    deleteItemCart(index) {
        this.cartService.deleteItem(index);
        //console.log('delteCartComponent', index);
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

    opdenDialogConfirm(cartItem: CartItem) {
        this.confirmationDialogService
            .confirm('', 'Esta seguro que desea Eliminar esta Foto')
            .then((confirmed) => this.delete(cartItem) + '' + confirmed)
            .catch(() =>
                console.log(
                    'User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'
                )
            );
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
        // ejecuto funcion de validacion
        // this.validarFakeCart()
        //console.log('fake cart btn add', fakeCart);


        if (this.fakeCart.length > 0) {

            if (this.validarFakeCart() == true) {
                this.cartService.mergeCartItems(fakeCart);
                this.toastr.success('Agregado Correctamente');
                this.dismiss()
            } else {
                this.toastr.error('Debe Seleccionar una Medida')
            }


        } else {
            this.toastr.error('Debe agregar almenos una copia.');
        }



    }




    /**
     * validarFakeCart
     *
     * Tomo el identificador del elemento html select-size
     * y lo almacenos en una variable de tipo let con nombre size
     *
     * la recorro con un for y obtengo el index de cada elemento , lo casteo a HTMLElement para poder acceder a las funciones de style de js
     *
     * creo otra variable llamada ValorSize para obtener el value de los selects (HTMLInputElement creo un casteo en la variable para poder tener estos datos)
     *
     * creo otro for que recorre el carrito falso, para poder saber el tipo de formato de la foto si es digital = 1 , o es impresa = 1
     *
     * tengo una condicional que verifica si es digital o impresa, si es impresa y no tiene los valores de las medidas seleccionadas macrco el border del input en rojo
     * y si selecciona el valor lo desmarco
     *
     *
     * @returns
     */


    validarFakeCart() {

        let isValid: Boolean = true

        //console.log("comienzo isvalid", isValid)

        let sizesArr = document.getElementsByClassName('select-size')


        //recorro cada copia de fakeCart
        for (let h = 0; h < this.fakeCart.length; h++) {
            let tipoFormatIndex = this.fakeCart[h];

            let indexSize = sizesArr[h];

            let valorTipoSize = (indexSize as HTMLInputElement).value

            console.log("valorTipoFormato" , valorTipoSize)
            if (tipoFormatIndex.digital[0]) {

                //si size  el campo esta vacio agregame el border rojo
                if (tipoFormatIndex.size == "") {

                    document.getElementById("select-size-" + h).setAttribute("style", "border: 2px solid red;");
                    // tam.classList.add('was-validated')
                   // console.log("isvalid if", isValid)

                    isValid = false
                } else {
                    indexSize.setAttribute("style", "");
                   // console.log("isvalid else", isValid)
                }


            }

        }





        return isValid

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

    typeChange(event, indx) {
        //console.log('event', event)
        // console.log('index', indx)

        let tipoFormato_el = event.target.value;
        //console.log('tipoFormato_el', tipoFormato_el);

        var form_de_copia_el = document.getElementById('itemCart-' + indx);
        //console.log('form_de_copia_el:', form_de_copia_el);
        let tipoFormato_el_Foto = document.getElementById('select-tipo-formato-' + indx)
        let campos_ocultos = document.getElementById(
            'contenedor-de-campos-ocultables-' + indx
        );
       // console.log('campos_ocultos', campos_ocultos);
        var classContainsShow = campos_ocultos.classList.contains('show');

        if (classContainsShow) {
            this.disabledbutton = false;
            campos_ocultos.classList.remove('show');
        } else {
            this.disabledbutton = true;
            campos_ocultos.classList.add('show');
        }


    }

    /*
  Control de opciones de formularios por onchange de size beta
  controla la activacion del boton si no se selecciona ninguna medida
  el boton quedara desactivado

  */

    public onChangeOptionValid(event, i) {
        let target = event.target[event.target.selectedIndex].value;
        let selectSize = (document.getElementById(
            'select-size-' + i
        ) as HTMLInputElement).value;

        //console.log('i', i);
        //console.log('select-size', selectSize);
        let fake = this.fakeCart;
        //console.log('fake change', fake);
       // console.log('target', target);

        fake.forEach((cart, index) => {
           // console.log('size for', cart.size);
            if (cart.size) {
            }
        });

        // if (selectSize == "") {
        //     console.log("paso por el if")
        //     this.disabledbutton = true
        // }

        if (target === '40x50' || target === '30x40' || target === '15x18') {
            //console.log('paso por el if');
            //this.disabledbutton = false
        }
    }
}
