import { Events } from './../../../core/models/events.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Event, Params } from '@angular/router';

import {EventsService} from '../../../core/service/events.services';

import { Observable } from 'rxjs';
@Component({
  selector: 'app-photo-detail',
  templateUrl: './events-detail.component.html',
  styleUrls: ['./events-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  eventos: Events;


  constructor(private route: ActivatedRoute, private eventService: EventsService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      console.log("ID DEL EVENTO: ", id);
      this.fetchEvents(id);
      console.log(this.fetchEvents(id), 'id OnInit')
    });
  }



  fetchEvents(id: string){
    this.eventService.getEventDetail(id)

    .subscribe( (eventosresponse: any) => {
       console.log(eventosresponse, 'evento detalle');
       this.eventos = eventosresponse.data.eventos;

     });
     console.log(this.eventService.getEventDetail(id));
  }



}
