import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import lottie from 'lottie-web';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  

  currentPage: string = 'page1';

  constructor(private navCtrl: NavController) {}

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
          preserveAspectRatio: 'xMidYMid slice' // Ekrana sığdırmak için bu ayarı kullanıyoruz
        }
        
      }).setSpeed(1);
    } else {
      console.error('Container element not found!');
    }
  }

  nextPage(pageId: string) {
    this.currentPage = pageId;
  }

  prevPage(pageId: string) {
    const current = document.getElementById(this.currentPage);
    const prev = document.getElementById(pageId);
    if (current && prev) {
      current.classList.remove('active');
      prev.classList.add('active');
      this.currentPage = pageId;
    }
  }

  goToLogin() {
    this.navCtrl.navigateForward('/register');
  }
}
