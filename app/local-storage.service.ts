import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {


  constructor() {}

  // Set a value in local storage
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Get a value from local storage
  getItem(key: string): any {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  // Remove a value from local storage
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Clear all items from local storage
  clear(): void {
    localStorage.clear();
  }
  private measurementsKey = 'measurements'; // Ölçümler için anahtar
  // Ölçümleri kaydet
  saveMeasurement(measurement: any): void {
    const measurements = this.getMeasurements();
    measurements.push(measurement);
    this.setItem(this.measurementsKey, measurements);
  }

  // Ölçümleri al
  getMeasurements(): any[] {
    return this.getItem(this.measurementsKey) || [];
  }

  // Ölçümü sil
  deleteMeasurement(index: number): void {
    const measurements = this.getMeasurements();
    if (index >= 0 && index < measurements.length) {
      measurements.splice(index, 1);
      this.setItem(this.measurementsKey, measurements);
    }
  }
}
