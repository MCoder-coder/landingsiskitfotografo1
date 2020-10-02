import { Component, OnInit } from '@angular/core';


import {Events} from '../../../core/models/events.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  images: Events[] = [ ];
  constructor() { }

  ngOnInit(): void {
  }

  clickImage(id:number){
    console.log('product');
    console.log(id);
  }
}
