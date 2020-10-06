import { EventsService } from '../../../core/service/events.services';
import { Events } from '../../../core/models/events.model';
import { retry } from 'rxjs/operators';
import { Component, OnInit , Input,
  Output,
  EventEmitter} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';



@Component({
  selector: 'app-gallery',
  templateUrl: './events-gallery.component.html',
  styleUrls: ['./events-gallery.component.css']
})
export class GalleryComponent implements OnInit {

  @Input() evento: Events;
  @Output() eventClicked: EventEmitter<any> = new EventEmitter();

  eventos: Events[] = [];


  constructor(private route: ActivatedRoute,private eventService: EventsService) { }

  ngOnInit(): void {
   this.fetchEvent();

  }

  clickEvent(id: number) {
    console.log('clickEvent en event-gallery.ts');
    console.log(id);
    this.eventClicked.emit(this.evento.ID);
  }

  // tslint:disable-next-line: typedef
  fetchEvent(){
    this.eventService.getAllEvents()
    .subscribe( (eventosresponse: any) => {
      console.log(eventosresponse, 'eventresponse');
      this.eventos = eventosresponse.data.eventos;

    });



    // .subscribe(eventresponse => {
    //   console.log(eventresponse)
    //   retry(3);
    //   this.eventos = eventresponse.data.eventos

    //   //this.imagen = image;
    // } );
  }



}
