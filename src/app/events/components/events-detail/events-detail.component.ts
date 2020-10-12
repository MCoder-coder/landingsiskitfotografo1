import { Events } from './../../../core/models/events.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Event, Params } from '@angular/router';

import { EventsService } from '../../../core/service/events.services';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { pipe } from 'rxjs/internal/util/pipe';
import { Fotos } from 'src/app/core/models/fotos.model';
@Component({
  selector: 'app-photo-detail',
  templateUrl: './events-detail.component.html',
  styleUrls: ['./events-detail.component.css'],
})
export class EventDetailComponent implements OnInit {
  //evento: Observable<Events>;

  fotos: Fotos;
  //evento: Events;
  id: any = <any>{};
  arrayFotosUrl: string[] = [];
  page = 1;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventsService
  ) {
    console.log(this.route.snapshot.paramMap.get('id/page'));
  }

  ngOnInit(): void {
    //this.route.params.subscribe((params: Params) => {
    //const ID = params.ID;
    let id = +this.route.snapshot.paramMap.get('id');
    this.eventService.getEventDetail(id);
    console.log('ID DEL EVENTO: ', id);
    this.fetchEvents(id);
    // console.log(this.fetchEvents(ID), 'id OnInit')
    // });
    //  this.evento = this.route.params
    //   .pipe(
    //     switchMap((params: Params) => {
    //       console.log(params.id , 'PARAMETROS ID')
    //       //console.log(this.eventService.getEventDetail(params.ID), 'Get eventsDetail')
    //       return this.eventService.getEventDetail(params.id);
    //     })
    //   );
    //let id = +this.route.snapshot.paramMap.get('id');
    //this.eventService.getEventDetail(id)

    //console.log(id, 'le id')

  }

  fetchEvents(id: number) {
    this.eventService.getEventDetail(id).subscribe((eventosresponse: any) => {
      console.log(eventosresponse, 'evento detalle');
      this.fotos = eventosresponse.data.fotos;
      console.log(' RESPONSE: ', eventosresponse.data.fotos);
      //     // www.juanschtrefotografo.com.ar/schapi/api/v3/fotos?eventos_id=28&page=0&per_page=20
    });
  }

  getEvent(){
    this.eventService.getAllEvents()
    .subscribe(eventosresponse => {
      this.arrayFotosUrl = this.arrayFotosUrl.concat((eventosresponse as any)
      .fotos.data.fotos.map(p => p.src.landscape));
      console.log(eventosresponse, 'scroll')
    })
  }
  onScroll() {
    this.page++
    if (this.id) {
      this.getEvent();
    }
    else {
      //this.requestSearchPhotos();
      console.log('no funciono')
    }
  }
}
