import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { EventsService } from 'src/app/core/services/events.services';


import {Events} from '../../../core/models/events.model';

@Component({
  selector: 'app-events',
  templateUrl: './events-important.component.html',
  styleUrls: ['./events-important.component.css']
})
export class EventsImportantComponent implements OnInit {

  eventos: Events[] = [];

  constructor(private eventService: EventsService) { }

  ngOnInit(): void {
    this.fetchEventsImportants();

  }



  // tslint:disable-next-line: typedef
  clickImage(id: number){
    console.log('product');
    console.log(id);
  }


  // tslint:disable-next-line: typedef
  fetchEventsImportants(){
    this.eventService.getEventImportantService()
    .subscribe( (eventosresponse: any) => {
      this.eventos = eventosresponse;
    });
  }

}
