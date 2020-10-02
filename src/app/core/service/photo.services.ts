import { Injectable } from '@angular/core';

import { Photo } from '../models/photo.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {




   images: Photo[] = [];

  constructor(private http: HttpClient) { }

  getAllPotos() {
    return this.http.get<Photo[]>('/api/v3/eventos?page=0&per_page=10');
  }

  getImages(id: string) {
    return this.images.find(item => id === item.id);
   return this.http.get(`https://platzi-store.herokuapp.com/products/${id}`)
  }
}
