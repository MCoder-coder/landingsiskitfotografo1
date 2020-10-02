import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import {EventsService} from '../../../core/service/events.services';
import { Events } from '../../../core/models/events.model';
@Component({
  selector: 'app-photo-detail',
  templateUrl: './events-detail.component.html',
  styleUrls: ['./events-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  photo: Events[] = [];

  constructor(private route: ActivatedRoute, private eventService: EventsService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      //this.photo = this.photoService.getImages(id);
    });
  }

}
