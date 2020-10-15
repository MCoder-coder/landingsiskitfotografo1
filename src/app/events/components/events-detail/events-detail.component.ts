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

  fotosArray: Fotos[];
  //evento: Events;
  id: any = <any>{};
  private actualPage: number;
  private nextPage: number;
  page: number;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventsService
  ) {
    console.log(this.route.snapshot.paramMap.get('id/page'));
    this.fotosArray = new Array<Fotos>();
    this.page = 0;
    this.actualPage = 0;
    this.nextPage = 1;

  }

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id');
    this.eventService.getEventDetailService(id , this.page);
    console.log('ID DEL EVENTO: ', id);
    this.fetchEventsFotos(id, this.nextPage);
  }

  fetchEventsFotos(id: number, page: number) {
    this.eventService.getEventDetailService(id , page).subscribe((eventosresponse: any) => {
      console.log(eventosresponse, 'evento detalle');
      //this.fotosArray = eventosresponse;
     // console.log(' RESPONSE: ', eventosresponse);

      console.log('eventosresponse.data.fotos: ', eventosresponse);
      console.log('this.fotosArray: ', this.fotosArray);
      if (eventosresponse) {

        //this.fotosArray.push(...eventosresponse);

        this.actualPage = page;
        console.log('Setea this.actualPage: ', this.actualPage);

        return eventosresponse[this.fotosArray.push(...eventosresponse)];
      }

    });
  }


  onScroll() {

    console.log('estas haciendo scrolld');
    if (this.fotosArray) {

      this.actualPage;
      console.log('actualPage: ', this.actualPage);

      this.nextPage = this.actualPage + 1;
      console.log('nextPage: ', this.nextPage);

      console.log('pide pagina siguiente: getEventPage() ');
      this.fetchEventsFotos(this.id, this.nextPage);

    }

  }
}
