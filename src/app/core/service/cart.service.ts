import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Fotos } from './../models/fotos.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private fotos: Fotos[] = [];
  private cart = new BehaviorSubject<Fotos[]>([]);

  constructor() { }

  addCart(fotos: Fotos) {
    this.fotos.push(fotos)
  }
}
