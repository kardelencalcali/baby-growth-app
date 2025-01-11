import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { LocalStorageService } from '../local-storage.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  user = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
   
  };
  imgStyle:string="";
  passwordType: string = 'password'; 

  constructor(private navCtrl: NavController,private localStorageService:LocalStorageService,public platform:Platform) {}
  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  this.imgStyle = this.platform.is('desktop') ? 'max-width:10% !important' :'max-width:50% !important'
  }


  onRegister() {
    // Kullanıcı bilgilerini local storage'a kaydetme
    this.localStorageService.setItem('user', JSON.stringify(this.user));

    // Kayıt sonrası kullanıcıyı login sayfasına yönlendir
    this.navCtrl.navigateForward('/login');
  }

  goToLogin() {
    this.navCtrl.navigateForward('/login');
  }
}
