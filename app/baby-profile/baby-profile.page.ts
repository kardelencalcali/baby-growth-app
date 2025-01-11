import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { Router } from '@angular/router';

interface Measurement {
  birthDate: string;
  measurementDate: string;
  height: number;
  weight: number;
  weightPercentile: number;
  heightPercentile: string;
}

@Component({
  selector: 'app-baby-profile',
  templateUrl: './baby-profile.page.html',
  styleUrls: ['./baby-profile.page.scss'],
})
export class BabyProfilePage implements OnInit {
  measurements: Measurement[] = [];
  selectedIndex: number | null = null;
  newBabyName: string = ''; // Kullanıcının girdiği yeni bebek adı
  babyName: string | null = null; // Kaydedilen bebek adı
  profileImage: string | ArrayBuffer | null = null; // Profil fotoğrafı için değişken
  isNameSaved: boolean = false; // Bebeğin adının kaydedilip edilmediğini kontrol eder

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMeasurements();
    this.loadProfileImage();

    this.resetProfile();
  }

  resetProfile(): void {
    // Yeni kullanıcı geldiğinde veya sıfırlama yapıldığında bebek profili bilgilerini temizle
    this.profileImage = null;
    this.babyName = null;
    this.newBabyName = '';
    this.measurements = []; // Ölçümleri de sıfırla
    this.isNameSaved = false;
    // Profil adı için yerel depolamayı temizle
    localStorage.removeItem('babyName');
  }

  loadMeasurements(): void {
    // Ölçümleri yerel depolamadan yükle
    this.measurements = this.localStorageService.getMeasurements();
  }

  saveBabyName(): void {
    // Bebek adını kaydet
    if (this.newBabyName.trim()) {
      this.babyName = this.newBabyName;
      this.saveBabyNameToLocalStorage();
      this.isNameSaved = true;
      console.log('Bebeğin Adı Kaydedildi:', this.babyName);
      this.router.navigate(['/form']); // Kaydedildikten sonra yönlendir
    }
  }

  saveBabyNameToLocalStorage(): void {
    // Bebek adını yerel depolamaya kaydet
    if (this.babyName) {
      localStorage.setItem('babyName', this.babyName);
    }
  }



  toggleCard(index: number): void {
    // Ölçüm kartlarını açıp kapat
    this.selectedIndex = this.selectedIndex === index ? null : index;
  }

  deleteMeasurement(index: number): void {
    // Ölçümü sil
    this.localStorageService.deleteMeasurement(index);
    this.loadMeasurements(); // Güncel ölçümleri tekrar yükle
  }

  onFileSelected(event: Event): void {
    // Fotoğraf seçimi yapıldığında
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.profileImage = reader.result; // Fotoğrafı base64 olarak sakla
        this.saveProfileImage(this.profileImage); // Profil fotoğrafını yerel depolamaya kaydet
      };

      reader.readAsDataURL(file); // Fotoğrafı base64 formatına dönüştür
    }
  }

  saveProfileImage(image: string | ArrayBuffer | null): void {
    // Profil fotoğrafını yerel depolamaya kaydet
    if (image) {
      localStorage.setItem('profileImage', image as string);
    }
  }

  loadProfileImage(): void {
    // Yerel depolamadan profil fotoğrafını yükle
    const image = localStorage.getItem('profileImage');
    if (image) {
      this.profileImage = image;
    }
  }

  deleteProfileImage(): void {
    // Profil fotoğrafını sil
    localStorage.removeItem('profileImage');
    this.profileImage = null; // Profil fotoğrafını sıfırla
  }

  formatDate(date: string): string {
    // Tarih formatını YYYY-MM-DD şeklinde kabul eder
    const [year, month, day] = date.split('-').map(Number);
    return `${year}.${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')}`;
  }

  goToFormPage(): void {
    this.router.navigate(['/form']); // Form sayfasının yönlendirme yolu
  }
}
