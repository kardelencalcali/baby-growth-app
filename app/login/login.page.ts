import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { LocalStorageService } from '../local-storage.service';
import lottie from 'lottie-web';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  errorMessage: string = '';
  passwordType: string = 'password';

  constructor(
    private navCtrl: NavController,
    private localStorageService: LocalStorageService,
    public platform:Platform
  ) {}
  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }


  ngOnInit() {
    // Lottie animasyonunu başlat
    const container = document.getElementById('lottie-background');
    if (container instanceof HTMLElement) {
      lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'assets/arkaplan.json',
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      }).setSpeed(1);
    } else {
      console.error('Container element not found!');
    }

    // Local storage'dan kullanıcı bilgilerini al ve formu doldur
    const userJson = this.localStorageService.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      this.email = user.email;
      this.rememberMe = true; // Kullanıcı varsa remember me seçeneğini işaretle
    }
  }

  onSubmit() {
    // Local storage'dan kullanıcı bilgilerini al
    const userJson = this.localStorageService.getItem('user');
    if (!userJson) {
      this.errorMessage = 'Kayıtlı kullanıcı bulunamadı.';
      return;
    }

    const user = JSON.parse(userJson);
    if (user.email === this.email && user.password === this.password) {
      // Giriş başarılı, kullanıcı bilgilerini sakla
      this.localStorageService.setItem('email', this.email);
      this.localStorageService.setItem('rememberMe', JSON.stringify(this.rememberMe));
      this.errorMessage = '';
      this.navCtrl.navigateForward('/baby-profile'); // Başarıyla giriş yaptıktan sonra yönlendirme
    } else {
      this.errorMessage = 'E-posta veya şifre yanlış.';
    }
  }

  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }
}
