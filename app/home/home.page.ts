import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import lottie from 'lottie-web';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router:Router) {}

  ngOnInit(): void {
        // Animasyonu yükleme işlemi
    const container = document.getElementById('lottie-container');
    if (container instanceof HTMLElement) {
      lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'assets/bebek.json'
      }).setSpeed(1,);
    } else {
      console.error('Container element not found!');
    }

    setTimeout(() => {
      this.router.navigate(['info']);
     },4000 )
    

  }
}
