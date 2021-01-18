import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

   data = localStorage.getItem('foto')
  constructor() { }

  ngOnInit(): void {
    this.getData()
  }


  getData(){

    const data = localStorage.getItem('foto')

    //this.data = JSON.parse(localStorage.getItem('foto'))
    console.log(  "data" ,data)

  }

}
