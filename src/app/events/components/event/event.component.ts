import { Events } from './../../../core/models/events.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { EventsService } from '../../../core/service/events.services';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  @Input() evento: Events;
  @Output() eventClicked: EventEmitter<any> = new EventEmitter();


  constructor(private eventService: EventsService) { }

  ngOnInit(): void {
  }


  clickBtn(){
    console.log('evento clickBtn() ');
    console.log('ID CLICKEADO: ', this.evento.ID);
    this.eventClicked.emit(this.evento.ID);
  }
}
