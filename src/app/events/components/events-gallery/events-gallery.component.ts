import { EventsService } from '../../../core/service/events.services';
import { Events } from '../../../core/models/events.model';
import { retry, map } from 'rxjs/operators';
import {
  Component, OnInit, Input,
  Output,
  EventEmitter
} from '@angular/core';
import { ActivatedRoute, Params, Event } from '@angular/router';
import { timeStamp } from 'console';



@Component({
  selector: 'app-gallery',
  templateUrl: './events-gallery.component.html',
  styleUrls: ['./events-gallery.component.css']
})
export class GalleryComponent implements OnInit {

  // @Input() evento: Events;
  // @Output() eventClicked: EventEmitter<any> = new EventEmitter();


  eventos: Events[];
  //  evento: Events;
  //page: number;
  items = [];
  data: any;
  errorMessage: string;
  page: number;
  perPage = 16;
  totalData = 0;
  totalPage = 0;
  sum = 100;
  private linesToWrite: Array<string>;
  private finishPage = 35;
  private actualPage: number;

  constructor(private eventService: EventsService) {
    this.linesToWrite = new Array<string>();
    this.add40lines();
    this.page = 1;
    this.actualPage = 1;


  }

  ngOnInit(): void {

       this.loadInitEvents();


  }

  clickEvent(id: number) {
    console.log('clickEvent en event-gallery.ts');
    console.log(id);
    //this.eventClicked.emit(this.evento.ID);
  }

  // tslint:disable-next-line: typedef
  fetchEvent() {
    this.eventService.getAllEvents()
      .subscribe((eventosresponse: any) => {
        console.log(eventosresponse, 'eventresponse');
        this.eventos = eventosresponse.data.eventos;

      });

  }

  add40lines() {
    const line = 'Another new line -- ';
    let lineCounter = this.linesToWrite.length;
    for (let i = 0; i < 40; i ++) {
      this.linesToWrite.push(line + lineCounter);
      lineCounter ++;
    }
  }

  loadInitEvents() {
    this.eventService.getEventScroll(this.page)
      .subscribe((eventosresponse: any) => {
        this.eventos = eventosresponse.data.eventos;
        console.log(this.page);
      });

  }


  onScroll() {

    console.log('scrolled down!!');
    if (this.actualPage < this.finishPage) {
        this.add40lines();
        this.actualPage ++;
        console.log(this.page);
    }



  }





  // tslint:disable-next-line: typedef
  //  onScroll() {

  //   this.page += 1;
  //    if (this.page <= 25) {
  //      this.getEventsScrolled();
  //    } else {
  //      console.log('No more lines. Finish page!');
  //    }
  //  }

  // onScroll() {
  //   console.log('down down down to the bottom of the sea');
  //   this.page ++;
  //   if (this.eventos.length>=1000) {
  //     this.getEventsScrolled();
  //     return;

  //   } else {
  //     console.log('No more lines. Finish page!');
  //   }
  // }


}
