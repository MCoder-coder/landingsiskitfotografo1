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
  
  
  
  // refactorizar nombre variable a: eventosArray
  addEvents: Array<Events>;
  private finishPage = 35; // corta el loop aqui 
  private actualPage: number;
  private nextPage: number;



  constructor(private eventService: EventsService) {
    this.addEvents  = new Array<Events>();
    //this.add40lines();
    this.page       = 0;
    this.actualPage =  0;
    this.nextPage   = 1;
  }

  ngOnInit(): void {
      let firstPage = 0;
      this.loadInitEvents(firstPage);
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

  // Llena el array de eventos
  // 
  add40lines() {
    const line = this.actualPage;
    let lineCounter = this.addEvents.length;
    console.log("(addEvents/eventosArray): lenght: ", lineCounter);
    for (let i = 0; i < 40 ; i ++) {
      //this.addEvents.push(line + lineCounter);
      lineCounter ++;
    }
  }

  // Refactorizar nombre a: getEventosPage
  loadInitEvents(page: number ) {
    this.eventService.getEventScroll(page)
      .subscribe((eventosresponse: any) => {

        console.log("eventosresponse.data.eventos: ",eventosresponse.data.eventos);
        console.log("this.addEvents: ",this.addEvents);
        /*
        for (let eventos_index = 0; eventos_index < eventosresponse.data.eventos.length; eventos_index++) {
          const element = eventosresponse.data.eventos[eventos_index];
          this.addEvents.push(element);
        }
        */
        if (eventosresponse.data.eventos.length > 0) {
          
        this.addEvents.push(...eventosresponse.data.eventos);

        this.actualPage = page;
        console.log("Setea this.actualPage: ", this.actualPage);
        }



      });

      //this.add40lines();
  }


  onScroll() {
    console.log('scrolled down!!');
    //return ;

     // if (this.actualPage < this.finishPage) {
          //this.add40lines();

          this.actualPage;
          console.log("actualPage: ", this.actualPage);
          
          this.nextPage = this.actualPage + 1;
          console.log("nextPage: ", this.nextPage);

          console.log("pide pagina siguiente: loadInitEvents() ");
          this.loadInitEvents(this.nextPage); // refactorizar a: getEventosPage

      //}
    



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
