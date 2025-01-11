import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  form!: FormGroup;
  currentStep: number = 1;
  showHeightInput = false;
  predictedHeight: number | undefined;
  

  constructor(private fb: FormBuilder, private navCtrl: NavController) {}

  ngOnInit() {
    this.form = this.fb.group({
      birthDate: [this.formatDate(new Date()), Validators.required],
      measurementDate: [this.formatDate(new Date()), Validators.required],
      weight: ['', [Validators.required, Validators.min(0)]],
      height: ['', [Validators.required, Validators.min(0)]],
      gender: ['', Validators.required],
      motherHeight: [{ value: '', disabled: true }, [Validators.required, Validators.min(0)]],
      fatherHeight: [{ value: '', disabled: true }, [Validators.required, Validators.min(0)]]
    });
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  nextStep() {
    if (this.currentStep < 4 ) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  toggleHeightPrediction() {
    this.showHeightInput = !this.showHeightInput;
    if (this.showHeightInput) {
      this.form.controls['motherHeight'].enable();
      this.form.controls['fatherHeight'].enable();
    } else {
      this.form.controls['motherHeight'].disable();
      this.form.controls['fatherHeight'].disable();
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = { ...this.form.value };
      if (this.showHeightInput) {
        const motherHeight = this.form.value.motherHeight;
        const fatherHeight = this.form.value.fatherHeight;
        this.calculatePredictedHeight(motherHeight, fatherHeight);
        formData.predictedHeight = this.predictedHeight;
      } else {
        formData.predictedHeight = undefined; // Eğer öngörülen boy hesaplanmazsa null olacak
      }
      this.navCtrl.navigateForward('/results', {
        queryParams: formData
      });
    }
  }

  calculatePredictedHeight(motherHeight: number, fatherHeight: number) {
    if (motherHeight && fatherHeight) {
      this.predictedHeight = (motherHeight + fatherHeight) / 2;
    }
  }
}
