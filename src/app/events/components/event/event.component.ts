import { Events } from './../../../core/models/events.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  @Input() evento: Events;
  @Output() eventClicked: EventEmitter<any> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }


  clickBtn(){
    console.log('evento clickBtn() ');
    console.log('ID CLICKEADO: ', this.evento.ID);
    this.eventClicked.emit(this.evento.ID);
  }
}
