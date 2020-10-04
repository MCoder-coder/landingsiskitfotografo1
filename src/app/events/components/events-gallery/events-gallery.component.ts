import { EventsService } from '../../../core/service/events.services';
import { Events } from '../../../core/models/events.model';
import { retry } from 'rxjs/operators';
import { Component, OnInit , Input,
  Output,
  EventEmitter} from '@angular/core';



@Component({
  selector: 'app-gallery',
  templateUrl: './events-gallery.component.html',
  styleUrls: ['./events-gallery.component.css']
})
export class GalleryComponent implements OnInit {

  @Input() events: Events;
  @Output() eventClicked: EventEmitter<any> = new EventEmitter();

  eventos: Events[] = [];


  constructor(private eventService: EventsService) { }

  ngOnInit(): void {
   this.fetchEvent();
  }

  clickImage(id:number){
    console.log('eventos');
    console.log(id);
  //  this.router.navigate([':id']);
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
