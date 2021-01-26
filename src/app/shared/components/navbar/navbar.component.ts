import { Component, OnInit } from '@angular/core';

import { FontAwesomeModule, FaIconLibrary  } from '@fortawesome/angular-fontawesome';

import { faCoffee, fas, faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  googleIcon = faShoppingCart;
  total;
  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.cartService.getTotalItemsObserver().subscribe(count => {
        this.total = count;
    })
  }





}
