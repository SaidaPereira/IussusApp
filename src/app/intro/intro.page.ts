import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    slidesPerView:1,
    centeredSlides:true,
    speed: 400
  };

  slides=[
    {
      imageSrc: "assets/img/IussusApp.png",
      imageAlt: "IussusAp",
      title  : "Bienvenido a:",
      descripcion: ""
    }
  ];

  constructor() { }

  

  ngOnInit() {
  }

}
