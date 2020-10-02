import { Component, OnInit } from '@angular/core';


import {Photo} from './../../../core/models/photo.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  images: Photo[] = [ ];
  constructor() { }

  ngOnInit(): void {
  }

  clickImage(id:number){
    console.log('product');
    console.log(id);
  }
}
