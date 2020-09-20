import { Component, OnInit } from '@angular/core';


import {Photo} from './../../../core/models/photo.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

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

  ngOnInit(): void {
  }

  clickImage(id:number){
    console.log('product');
    console.log(id);
  }
}
