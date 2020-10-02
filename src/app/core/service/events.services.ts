import { Injectable } from '@angular/core';

import { Events } from '../models/events.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventsService {




   images: Events[] = [];

  constructor(private http: HttpClient) { }

  getAllEvents() {
    return this.http.get<Events[]>('/api/v3/eventos?page=0&per_page=10');

  }

  getImages(id: string) {
    return this.images.find(item => id === item.id);
   return this.http.get(`https://platzi-store.herokuapp.com/products/${id}`)
  }
}
