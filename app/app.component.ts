import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import lottie from 'lottie-web';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private router: Router) {
  }
  ngOnInit() {
    const container = document.getElementById('lottie-background');
    if (container instanceof HTMLElement) {
      lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'assets/arkaplan.json',
        rendererSettings:{
          preserveAspectRatio: 'xMidYMid slice'
        }
      }).setSpeed(1);
    } else {
      console.error('Container element not found!');
    }
  }
}

 
  





