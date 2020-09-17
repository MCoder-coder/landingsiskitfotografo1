import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {


  images: string[] = [
    'assets/images/1.jpeg',
    'assets/images/2.jpg',

    'assets/images/4.jpg',
    'assets/images/5.jpg',
    'assets/images/1.jpeg',
    'assets/images/2.jpg',

    'assets/images/4.jpg',
    'assets/images/5.jpg',
    'assets/images/1.jpeg',
    'assets/images/2.jpg',

    'assets/images/4.jpg',
    'assets/images/5.jpg',
    'assets/images/1.jpeg',
    'assets/images/2.jpg',

    'assets/images/4.jpg',
    'assets/images/5.jpg',
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
