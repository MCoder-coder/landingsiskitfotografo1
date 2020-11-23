import { Component, OnInit, AfterViewInit } from '@angular/core';
import swiper, { Swiper } from 'swiper/bundle';


@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.css']
})
export class SwiperComponent implements OnInit , AfterViewInit {


  mySwiper: Swiper;


  images: string[] = [
    'assets/images/1.jpeg',
    'assets/images/2.jpg',

    'assets/images/4.jpg',

  ];

  constructor() {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.mySwiper = new Swiper('.swiper-container', {

      loop: true,

      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },

      pagination: {
        el: '.swiper-pagination',
      },
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

}
