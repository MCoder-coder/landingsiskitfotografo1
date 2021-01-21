import { EventsService } from '../../../core/services/events.services';
import { Events } from '../../../core/models/events.model';

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './events-container.component.html',
  styleUrls: ['./events-container.component.css'],
})
export class EventsGallerycontainerComponent implements OnInit {
  eventos: Events[] = [];
  page: number;
  //perPage = 16;
  // refactorizar nombre variable a: eventosArray
  eventosArray: Events[] = [];
  private actualPage: number;
  private nextPage: number;
  private isLoading: Boolean;

  constructor(private eventService: EventsService) {
    this.eventosArray = new Array<Events>();
    this.page = 0;
    this.actualPage = 0;
    this.nextPage = 0;
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.getEventPage(this.actualPage);
  }

  // tslint:disable-next-line:typedef
  clickEvent(id: number) {
    //  console.log('clickEvent en event-gallery.ts');
    //console.log(id);
  }

  // Refactorizar nombre a: getEventosPage
  // tslint:disable-next-line: typedef
  getEventPage(page: number) {
    this.isLoading = true;
    this.eventService.getEventPageService(page).subscribe((eventosresponse) => {
      this.isLoading = false;
      // console.log('eventosresponse.data.eventos: ', eventosresponse);
      //console.log('this.eventosArray: ', this.eventosArray);
      if (eventosresponse) {
        if (page >= this.actualPage) {
          this.actualPage = page;

          console.log('Setea this.actualPage: ', this.actualPage);

          return eventosresponse[this.eventosArray.push(...eventosresponse)];
        }
      }
    });
  }

  onScroll() {
    console.log('scrolled down!!');
    if (!this.isLoading) {
      //console.log('actualPage: ', this.actualPage);

      this.nextPage = this.actualPage + 1;
      //console.log('nextPage: ', this.nextPage);

      //console.log('pide pagina siguiente: getEventPage() ');
      this.getEventPage(this.nextPage); //refactorizar a: getEventosPage
    }
  }
}
