import { Component, OnInit , Input,
  Output,
  EventEmitter} from '@angular/core';
  import { Router } from '@angular/router';
import {PhotoService} from './../../../core/service/photo.services';
import {Photo} from './../../../core/models/photo.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  @Input() photo: Photo;
  @Output() photoClicked: EventEmitter<any> = new EventEmitter();

  images: Photo[] = [];
  constructor(private photoService: PhotoService) { }

  ngOnInit(): void {
   this.fetchProducts();
  }

  clickImage(id:number){
    console.log('eventos');
    console.log(id);
  //  this.router.navigate([':id']);
  }

  fetchProducts(){
    this.photoService.getAllPotos()
    .subscribe(image => {
      this.images = image;
    } );
  }



}
