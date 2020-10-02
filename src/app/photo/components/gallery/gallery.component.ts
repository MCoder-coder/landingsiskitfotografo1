import { EventsService } from './../../../core/service/events.services';
import { Events } from './../../../core/models/events.model';
import { Component, OnInit , Input,
  Output,
  EventEmitter} from '@angular/core';
  import { Router } from '@angular/router';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
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

  fetchEvent(){
    this.eventService.getAllEvents()
    .subscribe(eventresponse => {
      console.log(eventresponse)
      this.eventos = eventresponse.data.eventos
      //this.imagen = image;
    } );
  }



}
