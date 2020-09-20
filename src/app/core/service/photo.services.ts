import { Injectable } from '@angular/core';

import { Photo } from '../models/photo.model';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  images: Photo[] = [

    {
      id: '1',
      image: 'assets/images/1.jpeg',
      title: 'photo1',
      description: 'bla bla bla bla bla'
    },
    {
      id: '2',
      image: 'assets/images/2.jpg',
      title: 'photo2',
      description: 'bla bla bla bla bla'
    },
    {
      id: '3',
      image: 'assets/images/4.jpg',
      title: 'photo2',
      description: 'bla bla bla bla bla'
    },

    {
      id: '4',
      image: 'assets/images/5.jpg',
      title: 'photo4',
      description: 'bla bla bla bla bla'
    }






  ];

  constructor() { }

  getAllPotos() {
    return this.images;
  }

  getImages(id: string) {
    return this.images.find(item => id === item.id);
  }
}
