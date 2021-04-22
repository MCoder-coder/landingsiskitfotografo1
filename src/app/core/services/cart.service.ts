import { CartItem } from './../models/cartitem.model';

import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Fotos } from '../models/fotos.model';
import { LocalService } from './local.service';
import { Local } from 'protractor/built/driverProviders';
import { StorageService } from './storage.service';
import { Foto } from '../models/foto.model';
import { Console } from 'console';
import { CartModalDialogService } from './cart.modal.service';
import { reverse } from 'dns';
import { filter, map } from 'rxjs/operators';
import { element, ElementFinder } from 'protractor';
import { afterMain } from '@popperjs/core';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    private fotos: Fotos[] = [];
    private cart: CartItem[] = [];
    private tempCartItem: CartItem;
    fakeCartForPopup: CartItem[] = [];
    newItemCart: CartItem;
    foto: Foto;
    //Behaviour Subject nos permite utilizar una característica realmente útil y que es la de poder "recodar¨ el último valor emitido por el Observable a todas las nuevas subscripciones, al margen del momento temporal en que éstas se establezcan
    private totalItems: BehaviorSubject<number> = new BehaviorSubject<number>(
        0
    );

    //inyecto servicio de encriptacion para acceder a sus metodos
    constructor(
        private localService: LocalService,
        private cartModalService: CartModalDialogService
    ) {
        // cargo el carrito desde el local storage
        this.loadLocalStorageCart();
        this.totalItems.next(this.getFotosCount());
    }

    loadLocalStorageCart() {
        //El método JSON.parse() analiza una cadena de texto como JSON, transformando opcionalmente  el valor producido por el análisis.
        //let myCart = JSON.parse(localStorage.getItem('cart'));
        //local service inyectado en el constructo key cart para obtener los datos este metodo desencripta los datos guardados
        //en localStorage
        let get = this.localService.getJsonValue('cart');
        // console.log( 'get' , get)
        if (!get) {
            //si el carrito esta vacio
            this.cart = [];
        } else {
            //sino el carrito esta llenos
            this.cart = get;
        }
    }

    updateLocalStorageCart() {
        //El JSON.stringify()método convierte un objeto o valor de JavaScript en una cadena
        this.localService.setJsonValue('cart', this.cart);
        // let myCart = JSON.stringify(this.cart);
        //localStorage.setItem('cart', myCart);
    }

    // mescla el carrito falso con el real, agregando los cambios sin duplicar nada
    mergeCartItems(fakeCart: CartItem[]) {
        // nano
        let newMergedCart = this.mergeCart(this.cart, fakeCart);
        // console.log('newMergedCart', newMergedCart);
        this.cart = newMergedCart;

        // jr
        //let merge = this.obteniendoValorUnicoDespuesMerge(this.cart, fakeCart)
        //console.log("newMergedCart", merge)
        //this.cart = merge

        this.updateLocalStorageCart();
        this.totalItems.next(this.getFotosCount());
    }

    addToCart(cartItem: CartItem) {
        //console.log('cart.service.ts addToCart');

        this.cart.push(cartItem);
        this.updateLocalStorageCart();
        this.totalItems.next(this.getFotosCount());
        // console.log("AGREGADO CON EXITO")
    }

    //actualiza la cantidad de fotos dentro del carro o modal
    updateCantidad(key, nuevaCantidad: number) {
        this.cart[key].cantidad = nuevaCantidad;
        this.totalItems.next(this.getFotosCount());
        this.updateLocalStorageCart();
    }

    //obtengo los objetos dentro del carro
    getCart() {
        //console.log('cart de service', this.cart);

        return this.cart;
    }

    /**
     * getCartUnique
     * la idea de este metodo seria obtener las fotos del cart sin duplicados, poder filtrar los datos importante de cada copia y poder mostrar los
     * detalles de cada foto
     * por ejemplo si tengo  copias de la foto 15 pero cada copia tiene diferentes atributos poder obtener esos detalles como la medida , la cantidad etc
     *
     * @returns
     */

    getCartUnique() {
        let cartUniqueArray = this.cart.filter(
            (v, i, a) => a.findIndex((t) => t.foto.ID === v.foto.ID) === i
        );
        // console.log('CartUnique', cartUniqueArray);
        //actualizo el local Storage

        return cartUniqueArray;
    }

    /**
     * Metodo que se encarga de eliminar el item
     * de acuerdo a su index
     *  //actualizo la cantidad de items contados despues de la eliminacion del elemento
     *
     */
    deleteItem(index: number) {
        this.cart.splice(index, 1);
        this.updateLocalStorageCart();
        this.totalItems.next(this.getFotosCount());
    }

    /**
     * deleteAllFakeCart
     *
     * recibo los parametro del fakeCart para eliminarlos
     * como no tengo la ubicacion real del indice
     * tengo que recorrerlos
     * creo una variable eliminarCopias y asigno la variable element
     * que recocorre los items del parametro, llamo al carro real this.cart y llamo a la funcion
     * indexOf para obtener el indice real de los elemento
     * y poder eliminarlos por splice
     * @param items
     */
    deleteAllFakeCart(items) {
        console.log('items param', items);


        for (let index = 0; index < items.length; index++) {
            //indice de los items
            const element = items[index];
            console.log('elemento de service', element);
            //obtengo los indices reales del cart real
            let eliminarCopias = this.cart.indexOf(element);

            console.log('eliminar copias', eliminarCopias);
            // elimino los indices encontrados
            let splic = this.cart.splice(eliminarCopias, 1);
            console.log('splice', splic);
            //actualizo el local Storage
            this.updateLocalStorageCart();
            //actualizo la cuenta de la cantidad total
            this.totalItems.next(this.getFotosCount());
        }
    }

    deleteModalitem(deletItemModalId: any) {
        //console.log('delete modal id service', deletItemModalId);

        //console.log('recorriendo carro real');
        for (let j = 0; j < this.cart.length; j++) {
            let cartModal = this.cart[j];
            //console.log('CartModal actual del recorrido: ', cartModal);

            if (cartModal.ID === deletItemModalId) {
                //console.log(
                //   'borrando param deletItemModalId: ',
                // deletItemModalId
                // );
                //console.log('borrando cart id: ', cartModal.ID);

                this.cart.splice(j, 1);

                //console.log('Elemento eliminado: ', deletedItem);

                // console.log('cart real despues de delete ', this.cart);

                this.updateLocalStorageCart();
                this.totalItems.next(this.getFotosCount());
            }
        }
    }

    //limpio el cart completo y a su vez actualizo la cantidad actual
    clearCart(value) {
        this.fotos = [];
        this.cart = [];
        // console.log('el carrito de delete', this.cart)
        this.localService.clearToken('cart', value);
        this.updateLocalStorageCart();

        this.totalItems.next(this.getFotosCount());
        //console.log('value clearCart', value);
    }

    // sumo el total de las foto por la cantidad
    getFotosCount() {
        //return this.cart.length;
        let total: number = 0;
        for (let item of this.cart) {
            // console.log(item.cantidad);
            //suma el total que es igual a 0 por la la cantidad de item dentro del carrito
            total = Number(total) + Number(item.cantidad);
        }
        return total;
        //retorno el total de la suma
    }

    getTotalItemsObserver() {
        return this.totalItems;
    }

    // mescla el carrito falso con el real, agregando los cambios sin duplicar nada
    mergeCart(cart, fakeCart) {
        let jointArray = [];
        let arrays = [cart, fakeCart];
        //jr let concat = cart.concat(fakeCart)

        //jr let set = new Set(concat)
        // agrego items nuevos juntando los arrays (quedando duplicados quizá algunos)
        arrays.forEach((array) => {
            jointArray = [...jointArray, ...array];
        });
        //El método filter() crea un nuevo array con todos los elementos que cumplan la condición implementada por la función dada.
        let uniqueArray = jointArray.filter(
            (item, index) => jointArray.indexOf(item) === index
        );

        // "FakeCart" es solo una pieza/parte del carrito real,
        // pero "FakeCart" siempre tiene una MISMA FOTO con diferentes copiar
        // este metodo pasa la foto que tenemos en el FakeCart tomandola del indice 0 porque todos tienen la misma foto.
        let copiasEnCart = this.ObtenerCopiasMismaFotoCart(fakeCart[0].foto);

        let difference = copiasEnCart.filter((x) => !fakeCart.includes(x));

        let uniqueArrayFinal = uniqueArray.filter(
            (x) => !difference.includes(x)
        );

        return uniqueArrayFinal;
    }

    /**
     * Recibe una foto X por parametro
     * Genera un array nuevo vacio llamado copiasEnCart, el cual almacenará las copias de la misma foto del carro real, en el nuevo array
     * devolviendo como resultado un array con todas las copias de la foto actual que hay en el carro real
     * @param foto Foto.Model
     * @returns copiasEnCart Array: todas las copias de foto que hay en el cart real
     */
    ObtenerCopiasMismaFotoCart(foto) {
        let copiasEnCart: CartItem[] = [];

        for (let index = 0; index < this.cart.length; index++) {
            const cartItem = this.cart[index];

            if (cartItem.foto == foto) {
                copiasEnCart.push(cartItem);
            }
        }
        // console.log('copias de la misma fotos', copiasEnCart);

        return copiasEnCart;
    }

    //modal para preferencias de la fotos para el carrito
    addToCartPopUp(foto: Foto) {
        //existe en el carrito?
        //una variable asignada al modelos CarItem que obtiene de la funcion firstNew la foto seleccionada , este metodo compara si la fotos son iguales, para poder mostrar una sola y no ambas
        // this.newItemCart = this.firstOrNew(foto);
        this.fakeCartForPopup = this.firstOrNew(foto);
        //console.log('newCartItem addTOcarModal', this.newItemCart);
        //initialState lo inicializo en appModule
        const initialState = {
            tempFoto: foto,
            fakeCart: this.fakeCartForPopup,
            // itemCart: this.newItemCart,
        };
        //console.log('fakeCartForPopup addTOcarModal', foto);
        //console.log('initialState', { initialState });
        //muestro el modal paso el nombre del Componente modal y paso los datos en initialState para mostrar los datos
        //  this.modalRef = this.modalService.show(CartAddModalComponent, {
        //      initialState,
        //  });

        this.cartModalService.cartOpenDialogModal(initialState);
    }

    //primer foto seleccionada
    firstOrNew(foto: Foto): CartItem[] {
        // tempCarte almacenos los datos obtenidos en una variable temporal : getCart servicio de CartService obtiene los datos de carrito
        let tempCart = this.getCart();
        console.log('tempCart', tempCart);
        //variable asignada a CarItem de tipo array
        let newfakeCartForPopup: CartItem[] = [];

        for (let index = 0; index < tempCart.length; index++) {
            //recorro el array cart hago una comparacion del id de la fotografia basandome en el modelo
            //en this.cart obtengo el index la ubiacion del array y los comparo con el foto id dentro de este array
            //si el booleano es true osea el id duplicado en ambos detengo el bucle para no seguir agregando datos
            let i = tempCart[index].foto.ID;

            if (foto.ID == i) {
                //comparo la foto.id con el el objeto temCart con el indice ID si estos son iguales returno tempcart el ID de la foto seleccionada
                //console.log('tempaCarIf', tempCart[index]);

                newfakeCartForPopup.push(tempCart[index]);
            }
        }

        let newCartItem: CartItem = <any>{
            ID: foto.ID + '-' + '1' + new Date().getUTCMilliseconds(),
            foto: foto,
            cantidad: 1,
            size: '',
            digital: 1,
        };

        //console.log('newfakeCartForPopup', newfakeCartForPopup);
        //retorno la instancia del objeto carItem

        //console.log("shift" , shift)
        //siempre la foto va a ser igual a cero condicional
        if (newfakeCartForPopup.length == 0) {
            //   agrego la instancia del cartItem push
            newfakeCartForPopup.push(newCartItem);
        }

        return newfakeCartForPopup;
    }
}
