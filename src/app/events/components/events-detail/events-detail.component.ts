import { Events } from './../../../core/models/events.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Event, Params } from '@angular/router';

import { EventsService } from '../../../core/service/events.services';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { pipe } from 'rxjs/internal/util/pipe';
@Component({
  selector: 'app-photo-detail',
  templateUrl: './events-detail.component.html',
  styleUrls: ['./events-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  //evento: Observable<Events>;


  evento: Events;

  constructor(private route: ActivatedRoute, private eventService: EventsService) {
    console.log(this.route.snapshot.paramMap.get('id'))
  }

  ngOnInit(): void {

    this.route.snapshot.paramMap.get('id');
    let id = +this.route.snapshot.paramMap.get('id');
    this.eventService.getEventDetail(id)
    console.log(id)

    this.route.params.subscribe((params: Params) => {
      const ID = params.ID;
      let id = +this.route.snapshot.paramMap.get('id');
      this.eventService.getEventDetail(ID)
      console.log("ID DEL EVENTO: ", ID);
      this.fetchEvents(id);
      console.log(this.fetchEvents(id), 'id OnInit')
    });
    //  this.evento = this.route.params
    //   .pipe(
    //     switchMap((params: Params) => {
    //       console.log(params.id , 'PARAMETROS ID')
    //       //console.log(this.eventService.getEventDetail(params.ID), 'Get eventsDetail')
    //       return this.eventService.getEventDetail(params.id);
    //     })
    //   );
    //  let id = +this.route.snapshot.paramMap.get('id');
    //  this.eventService.getEventDetail(id)

    //  console.log(id, 'le id')
  }



  fetchEvents(id: number) {
    this.eventService.getEventDetail(id)
      .subscribe((eventosresponse: any) => {
        console.log(eventosresponse, 'evento detalle');
        this.evento = eventosresponse.data.fotos;
        console.log(this.evento = eventosresponse.data.fotos, ' RESPONSE')
        //     // www.juanschtrefotografo.com.ar/schapi/api/v3/fotos?eventos_id=28&page=0&per_page=20
      });


    //  }



  }


}
