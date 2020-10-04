import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/core/service/events.services';


import {Events} from '../../../core/models/events.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  eventos: Events[] = [ ];

  constructor(private eventService: EventsService) { }

  ngOnInit(): void {
    this.fethEventsImportants();
  }

  clickImage(id:number){
    console.log('product');
    console.log(id);
  }


  fethEventsImportants(){
    this.eventService.getImages()
    .subscribe( (eventosresponse: any) => {
      this.eventos = eventosresponse.data.eventos;

    });



  }

}
