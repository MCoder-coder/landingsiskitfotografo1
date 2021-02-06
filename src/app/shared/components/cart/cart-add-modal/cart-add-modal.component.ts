
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Foto } from './../../../../core/models/foto.model';
import { CartService } from './../../../../core/services/cart.service';
import { Component, OnInit  } from '@angular/core';
import { flatten } from '@angular/compiler';
import {
  faCoffee,
  fas,
  faShoppingCart,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FormGroup} from '@angular/forms';
import { Size } from '../../../../core/models/sieze.model';

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
  selectedSize = ["15x18" , "30x40", "40x50"];

  //(change)se activa cuando el usuario cambia la entrada

  cart = this.cartService.getCart();

  constructor(private cartService : CartService , private formBuilder: FormBuilder) {
      this.buildOptionForm()


   }

  ngOnInit(): void {
      console.log('itemCart modal size' , this.itemCart.size)
      console.log('save form' , this.form.value)
      //console.log('itemcar Size' , this.itemCart.size)

      this.itemCart.size = this.selectedSize


  }
  generateArray(obj){

    return Object.keys(obj).map(key => obj[key]);
 }

//  selectOption(id: any) {
//   //getted from event
//   console.log('id', id);
//   //getted from binding
//   console.log('select' ,this.selectedSize)




//   this.selectedSize = id.value




//   //this.itemCart.size = id
// }




  private buildOptionForm(){
    this.form = this.formBuilder.group({
       optionselect : this.formBuilder.array([])
    })
  }

  createOptionForm(){
    return  this.formBuilder.group({
      size : [''],
       cantidad : [''],
       digital : [''],
       impresa : [''],
    })
  }


  addOptionForm(){
      this.optionSelect.push(this.createOptionForm())
  }

  get optionSelect(){
    return this.form.get('optionselect') as FormArray
  }
  delete(index : number){
    this.optionSelect.removeAt(index)
  }

  addToCartFoto(item){
    console.log('item ' , item)
    console.log("car-add-modal funcion addToCart");
    let  isDuplicated = false
    let getcarrito = this.cart


    //console.log('foto de componente modal cart' , foto)
    //console.log('foto size' , this.itemCart.size)
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

      //this.cartService.addToCart(this.itemCart)
      console.log('addTocart' , this.cartService.addToCart(this.itemCart))

     }else{
      console.log('es duplicada')
     }




  }




  sizeChange(event){

    console.log('event' , event)
  }



  updateCartItem(event, key) {
    // console.log('updateCartitem', event);
    //actualiza la cantidad de items del cart, event observa si el input cambia
     this.cartService.updateCantidad(key, event.target.value);
   }

   typeChange(event){
      console.log('event' , event)

     let type_el = event.target

     console.log('type_el' , type_el)
    //es impresa?
     if (type_el.value == 0) {
       let ty = document.getElementsByClassName('inputHidden')
        console.log('ty' , ty)
        for (let index = 0; index < ty.length; index++) {
          const element = ty[index];
          console.log('element' , element)
            if (element.classList.contains('show')) {

            }else{
              element.classList.add('show')
            }

        }


     }

     if (type_el.value == 1) {
       let ty = document.getElementsByClassName('inputHidden')

       for (let index = 0; index < ty.length; index++) {
         const element = ty[index];
            console.log('element 1' , element)
            if (element.classList.contains('show')) {
              element.classList.remove('show')
            }
       }

     }

   }



}
