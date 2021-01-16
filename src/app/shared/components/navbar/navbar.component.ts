import { Component, OnInit } from '@angular/core';

import { FontAwesomeModule, FaIconLibrary  } from '@fortawesome/angular-fontawesome';

import { faCoffee, fas, faShoppingCart} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  googleIcon = faShoppingCart;

  constructor() { }

  ngOnInit(): void {
  }

}
