import { CartItem } from './../models/cartitem.model';

import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Fotos } from '../models/fotos.model';
import { LocalService } from './local.service';
import { Local } from 'protractor/built/driverProviders';
import { StorageService } from './storage.service';
import { Foto } from '../models/foto.model';
import { Console } from 'console';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private fotos: Fotos[] = [];
  private cart: CartItem[] = [];
  private tempCartItem: CartItem;
  //Behaviour Subject nos permite utilizar una característica realmente útil y que es la de poder "recodar¨ el último valor emitido por el Observable a todas las nuevas subscripciones, al margen del momento temporal en que éstas se establezcan
  private totalItems: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  //inyecto servicio de encriptacion para acceder a sus metodos
  constructor(private localService: LocalService) {
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
    this.localService.setJsonValue('cart', this.cart)
    // let myCart = JSON.stringify(this.cart);
    //localStorage.setItem('cart', myCart);
  }

  // mescla el carrito falso con el real, agregando los cambios sin duplicar nada
  mergeCartItems(fakeCart: CartItem[]) {
  //  let newMergedCart = this.mergeCart(this.cart, fakeCart)

    let merge = this.obteniendoValorUnicoDespuesMerge(this.cart , fakeCart)
    console.log("newMergedCart", merge)
    this.cart = merge
    this.updateLocalStorageCart();
    this.totalItems.next(this.getFotosCount());
  }



  addToCart(cartItem: CartItem) {
    console.log("cart.service.ts addToCart")
    //this.cart.push(fotos);
    //let isDuplicate = false;

    //  this.fotos.push(foto);
    // console.log('cart push' ,this.fotos.push(foto) )

    //modelo de cart
    // let newCartitem: CartItem = <CartItem>{
    //   ID: 0,
    //   foto: foto,
    //   cantidad: 1,
    //   size: '15x18',
    // };
    //console.log('cart item', newCartitem);
    //agrego datos del model en this.cart
    //console.log('fuera del if' , foto)
    //console.log('fuera del if cart' , this.cart)

    //console.log('newCartItem de service' , newCartitem)
    // for (let index = 0; index < this.cart.length; index++) {
    //recorro el array cart hago una comparacion del id de la fotografia basandome en el modelo
    // en this.cart obtengo el index la ubiacion del array y los comparo con el foto id dentro de este array
    //si el booleano es true osea el id duplicado en ambos detengo el bucle para no seguir agregando datos
    // console.log('dentro del for itemcart service' , this.cart[index].foto.ID)

    //}

    //console.log('foto id' , foto.ID)

    //this.cart.push(newCartitem);
    // //console.log('segundo if')
    // this.updateLocalStorageCart();

    //this.totalItems.next(this.getFotosCount());


    this.cart.push(cartItem);
    this.updateLocalStorageCart();
    this.totalItems.next(this.getFotosCount());
    console.log("AGREGADO CON EXITO")
  }

  //actualiza la cantidad de fotos dentro del carro o modal
  updateCantidad(key, nuevaCantidad: number) {
    this.cart[key].cantidad = nuevaCantidad;
    this.totalItems.next(this.getFotosCount());
    this.updateLocalStorageCart();
  }

  //obtengo los objetos dentro del carro
  getCart() {
    return this.cart;
  }


/**
 * Metodo que se encarga de eliminar el item
 * de acuerdo a su index
 *  //actualizo la cantidad de items contados despues de la eliminacion del elemento
 *
 */
deleteItem(index : number){
  //delete this.cart[index]
  // const valueRemove = index
  //  this.cart.filter(function(item) {
  //   return item !== valueRemove
  // })


  //  this.cart.splice(cart.ID , 1)
   // this.cart.slice(index , 1)
    console.log("index service" , this.cart.splice(index , 1) )
    this.updateLocalStorageCart();
    this.totalItems.next(this.getFotosCount());



}

  //limpio el cart completo y a su vez actualizo la cantidad actual
  clearCart(value) {
    this.fotos = [];
    this.cart = [];
    // console.log('el carrito de delete', this.cart)
    this.localService.clearToken('cart', value)
    this.updateLocalStorageCart();

    this.totalItems.next(this.getFotosCount());
    console.log('value clearCart' , value)
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
  mergeCart2(...arrays) {
    let jointArray = []

    arrays.forEach(array => {
      jointArray = [...jointArray, ...array]
    })
    //El método filter() crea un nuevo array con todos los elementos que cumplan la condición implementada por la función dada.
    const uniqueArray = jointArray.filter((item, index) => jointArray.indexOf(item) === index)

    return [...new Set([...uniqueArray])]
  }

  // mescla el carrito falso con el real, agregando los cambios sin duplicar nada
  mergeCart(cart, fakeCart) {
    let jointArray = []
    let arrays = [cart, fakeCart]
    let concat = cart.concat(fakeCart)

    let set = new Set(concat)
    // agrego items nuevos juntando los arrays (quedando duplicados quizá algunos)
    arrays.forEach(array => {
      jointArray = [...jointArray, ...array]
    })
    //El método filter() crea un nuevo array con todos los elementos que cumplan la condición implementada por la función dada.
    let uniqueArray = jointArray.filter((item, index) => jointArray.indexOf(item) === index)


    let copiasEnCart = this.ObtenerCopiasMismaFotoCart(fakeCart[0].foto);

    let difference = copiasEnCart.filter(x => !fakeCart.includes(x));

    let uniqueArrayFinal = uniqueArray.filter(x => !difference.includes(x));

    return uniqueArrayFinal
  }




    obteniendoValorUnicoDespuesMerge(array1 , array2){
    /**7
     * Las dos matrices se combinan mediante el método.concat()
        El bucle se utiliza para recorrer en bucle todos los elementos de .for...of arr
        El método devuelve -1 si el elemento no está en la matriz.indexOf()
        Por lo tanto, durante cada iteración, si el elemento es igual a -1,el elemento se agrega a la matriz mediante el método.uniqueArrpush()
     */
        let concat = array1.concat(array2);

        let unicoArray : CartItem[] = []

        for(let i of concat){

            if (unicoArray.indexOf(i) === -1) {
                unicoArray.push(i)
            }
        }

        console.log( 'unico array dentro for'  ,unicoArray)

        return unicoArray
    }


  ObtenerCopiasMismaFotoCart(foto){

    let copiasEnCart: CartItem[] = []

    for (let index = 0; index < this.cart.length; index++) {
      const cartItem = this.cart[index];

      if(cartItem.foto==foto){
          copiasEnCart.push(cartItem)
      }

    }

    return copiasEnCart
  }
}
