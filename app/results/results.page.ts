import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { Chart, ChartDataset, ChartOptions } from 'chart.js';
import { LocalStorageService } from '../local-storage.service'; 
interface PercentilesData {
    male: {
        [percentile: number]: {
            weight: number[];
            height: number[];
        };
    };
    female: {
        [percentile: number]: {
            weight: number[];
            height: number[];
        };
    };
}

@Component({
    selector: 'app-results',
    templateUrl: './results.page.html',
    styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit, AfterViewInit {
    data: any;
    weightStatus: string | undefined;
    birthDate: string = '';
    babyCurrentMonth:number = 0;
    measurementDate: string = '';
    weight: number = 0;
    height: number = 0;
    gender: 'male' | 'female' = 'male';
    motherHeight?: number;
    fatherHeight?: number;
    predictedHeight?: number;
    weightPercentile?: number;
    heightPercentile?: number;
    ageRange = [1, 3, 6, 9, 12, 15, 18, 24, 30, 36];
    ageResult:string='';
    statusMessage: string = 'Normal';
    statusColor: string = 'success';
    BabyStatus: string | undefined;
    

    private percentiles: PercentilesData = {
        male: {
            3: { weight: [2.58, 4.75, 6.21, 7.27, 7.96, 8.61, 9.13, 10.12, 11.06, 11.81], height: [45.9, 56.2, 62.8, 67.4, 70.8, 73.8, 76.4, 81.0, 85.3, 89.3] },
            10: { weight: [2.85, 5.26, 6.79, 7.87, 8.61, 9.28, 9.82, 10.85, 11.84, 12.65], height: [47.2, 57.8, 64.5, 69.1, 72.7, 75.8, 78.5, 83.3, 87.6, 91.7] },
            25: { weight: [3.13, 5.79, 7.41, 8.51, 9.32, 10.01, 10.58, 11.66, 12.71, 13.61], height: [48.5, 59.5, 66.2, 70.9, 74.7, 77.9, 80.7, 85.6, 90.0, 94.1] },
            50: { weight: [3.43, 6.38, 8.12, 9.26, 10.16, 10.89, 11.49, 12.66, 13.80, 14.83], height: [50.0, 61.3, 68.8, 72.8, 76.9, 80.2, 83.1, 88.2, 92.6, 96.8] },
            75: { weight: [3.73, 6.99, 8.85, 10.06, 11.05, 11.83, 12.48, 13.76, 15.04, 16.24], height: [51.5, 63.2, 69.9, 74.7, 79.1, 82.5, 85.5, 90.8, 95.3, 99.4] },
            90: { weight: [4.00, 7.54, 9.54, 10.81, 11.92, 12.75, 13.46, 14.86, 16.29, 17.71], height: [52.9, 64.8, 71.6, 76.4, 81.1, 84.5, 87.7, 93.2, 97.6, 101.8] },
            97: { weight: [4.27, 8.10, 10.25, 11.58, 12.82, 13.72, 14.49, 16.05, 17.69, 19.39], height: [54.2, 66.4, 73.2, 78.1, 83.0, 86.6, 89.8, 95.5, 100.0, 104.2] },
        },
        female: {
            3: { weight: [2.52, 4.48, 5.94, 6.85, 7.52, 8.09, 8.57, 9.49, 10.35, 11.19], height: [45.3, 55.3, 61.6, 66.0, 69.7, 72.8, 75.5, 80.1, 84.0, 87.8] },
            10: { weight: [2.76, 4.90, 6.38, 7.34, 8.06, 8.67, 9.19, 10.20, 11.17, 12.09], height: [46.6, 56.8, 63.1, 67.7, 71.4, 74.6, 77.4, 82.3, 86.3, 90.2] },
            25: { weight: [3.01, 5.33, 6.85, 7.89, 8.66, 9.31, 9.87, 10.99, 12.06, 13.05], height: [47.9, 58.2, 64.7, 69.3, 73.2, 76.5, 79.3, 84.4, 88.6, 92.7] },
            50: { weight: [3.29, 5.82, 7.43, 8.55, 9.39, 10.10, 10.71, 11.94, 13.12, 14.18], height: [49.4, 59.9, 66.4, 71.2, 75.1, 78.5, 81.5, 86.8, 91.2, 95.4] },
            75: { weight: [3.58, 6.32, 8.06, 9.29, 10.20, 10.96, 11.63, 12.99, 14.25, 15.37], height: [50.8, 61.5, 68.2, 73.0, 77.1, 80.6, 83.7, 89.2, 93.8, 98.1] },
            90: { weight: [3.84, 6.78, 8.68, 10.02, 11.00, 11.81, 12.55, 14.03, 15.33, 16.51], height: [52.1, 63.0, 69.7, 74.6, 78.8, 82.4, 85.6, 91.4, 96.1, 100.6] },
            97: { weight: [4.10, 7.24, 9.34, 10.82, 11.87, 12.73, 13.54, 15.15, 16.47, 17.68], height: [53.4, 64.5, 71.3, 76.3, 80.5, 84.2, 87.6, 93.5, 98.4, 103.0] },
        },
    };
    public weightChartOptions: ChartOptions<'line'> = {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Age (months)',
                },
                ticks: {
                    // X eksenindeki adımların aralığını artırarak mesafeyi kontrol edebilirsiniz
                    stepSize: 1 // Adım boyutunu artırarak boşlukları genişletebilirsiniz
                },
                grid: {
                    display: true,
                    drawBorder: false,
                    drawOnChartArea: true,
                    drawTicks: false,
                    color: '#e0e0e0', // Izgara çizgilerinin rengi
                    lineWidth: 1 // Izgara çizgilerinin kalınlığı
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Weight (kg)',
                },
                ticks: {
                    // Y eksenindeki adımların aralığını artırarak mesafeyi kontrol edebilirsiniz
                    stepSize: 1 // Adım boyutunu artırarak boşlukları genişletebilirsiniz
                },
                grid: {
                    display: true,
                    drawBorder: false,
                    drawOnChartArea: true,
                    drawTicks: false,
                    color: '#e0e0e0', // Izgara çizgilerinin rengi
                    lineWidth: 1 // Izgara çizgilerinin kalınlığı
                },
            },
        },
        elements: {
            line: {
                tension: 0.1, // Çizgi eğimini azaltarak keskinleştirin
                borderWidth: 2 // Çizgi kalınlığını artırarak görünürlüğü artırın
            },
            point: {
                radius: 4, // Veri noktalarının çapını ayarlayın
                hoverRadius: 6 // Hover sırasında veri noktalarının çapını ayarlayın
            }
        },
        plugins: {
            legend: {
                display: true,
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return tooltipItem.label + ': ' + tooltipItem.raw;
                    },
                },
            },
        },
    };
    
    public heightChartOptions: ChartOptions<'line'> = {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Age (months)',
                },
                
            },
            y: {
                title: {
                    display: true,
                    text: 'Height (cm)',
                },
                ticks: {
                    // Y eksenindeki adımların aralığını artırarak mesafeyi kontrol edebilirsiniz
                    stepSize: 1// Adım boyutunu artırarak boşlukları genişletebilirsiniz
                },
                grid: {
                    display: true,
                    drawBorder: false,
                    drawOnChartArea: true,
                    drawTicks: false,
                    color: '#e0e0e0', // Izgara çizgilerinin rengi
                    lineWidth: 1 // Izgara çizgilerinin kalınlığı
                },
            },
        },
        elements: {
            line: {
                tension: 0.1, // Çizgi eğimini azaltarak keskinleştirin
                borderWidth: 1 // Çizgi kalınlığını artırarak görünürlüğü artırın
            },
            point: {
                radius: 4, // Veri noktalarının çapını ayarlayın
                hoverRadius: 6 // Hover sırasında veri noktalarının çapını ayarlayın
            }
        },
        plugins: {
            legend: {
                display: true,
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return tooltipItem.label + ': ' + tooltipItem.raw;
                    },
                },
            },
        },
    };
    

    constructor(private route: ActivatedRoute, 
        private navCtrl:NavController,
        public platform:Platform,
        private router:Router,
        private localStorageService:LocalStorageService) 
    {}
    calculateAge(birthDate: string, measurementDate: string): number {
        const birth = new Date(birthDate);
        const measurement = new Date(measurementDate);
        const diff = measurement.getTime() - birth.getTime();
        const diffMonths = diff / (1000 * 60 * 60 * 24 * 30);
        return Math.round(diffMonths);
        //age range listesindeki en yakın değere eşit olsun veya buradaki değeri de listeye ata 
    }
    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.birthDate = params['birthDate'];
            this.measurementDate = params['measurementDate'];
            this.weight = +params['weight'];
            this.height = +params['height'];
            this.gender = params['gender'] === 'female' ? 'female' : 'male';
            this.motherHeight = +params['motherHeight'];
            this.fatherHeight = +params['fatherHeight'];
    

            if (this.motherHeight && this.fatherHeight) {
                this.predictedHeight = this.calculatePredictedHeight(this.motherHeight, this.fatherHeight, this.gender);
            }

            if (this.weight > 0) {
     
                this.weightPercentile = this.calculatePercentile(this.weight, this.percentiles[this.gender][50].weight);
               
            }

            if (this.height > 0) {
             
                this.heightPercentile = this.calculatePercentile(this.height, this.percentiles[this.gender][50].height);
              
                
            }

            this.weightStatus = this.getWeightStatus(this.weight);
        });
        this.babyCurrentMonth = this.calculateAge(this.birthDate,this.measurementDate)
        this.ageRange.push(this.babyCurrentMonth);
        this.ageRange = Array.from(new Set(this.ageRange).values()); 
        this.ageRange.sort((a,b)=>a-b)
        

    }

    ngAfterViewInit() {
        this.renderCharts();
    }

    private calculatePercentile(value: number, data: number[]): number | undefined {
       
        if (data.length === 0) return undefined;
        const index = data.findIndex(d => d >= value);
            if(index === -1) return 100;
            return Math.round((index / data.length) * 100);
            }
    

    private calculatePredictedHeight(motherHeight: number, fatherHeight: number, gender: 'male' | 'female'): number {
        const averageHeight = (motherHeight + fatherHeight) / 2;
       { return gender === 'male' ? averageHeight + 6 : averageHeight - 6;

       }
    }

    private getWeightStatus(weight: number): string {
        if (this.weight < 5){
            this.statusMessage = 'Ağırlık düşük';
            this.statusColor = 'danger';
        }

        if (weight >= 5 && weight <= 10) return 'Normal';
        return 'Overweight';
    }

    private renderCharts() {
      

        const weightChartCtx = document.getElementById('weight-growth-chart') as HTMLCanvasElement;
        const heightChartCtx = document.getElementById('height-growth-chart') as HTMLCanvasElement;

        new Chart(weightChartCtx, {
          type: 'line',
          data: {
              labels: this.ageRange,
              datasets: [
                  {
                      label: '3',
                      data: this.percentiles[this.gender][3].weight,
                      borderColor: 'red',
                      backgroundColor: 'transparent',
                      fill: false,
                      
                      pointBorderColor:"white"
                  },
                  {
                      label: '10',
                      data: this.percentiles[this.gender][10].weight,
                      borderColor: 'grey',
                      backgroundColor: 'transparent',
                      fill: false,
                     pointBorderColor:"white"
                      
                  },
                  {
                    label: '25',
                    data: this.percentiles[this.gender][25].weight,
                    borderColor: 'grey',
                    backgroundColor: 'transparent',
                    fill: false,
                    pointBorderColor:"white"
                },
                
                  {
                      label: '50',
                      data: this.percentiles[this.gender][50].weight,
                      borderColor: 'green',
                      backgroundColor: 'transparent',
                      fill: false,
                     pointBorderColor:"white"
                  },
                  {
                      label: '75',
                      data: this.percentiles[this.gender][75].weight,
                      borderColor: 'grey',
                      backgroundColor: 'transparent',
                      fill: false,
                     pointBorderColor:"white"
                  },
                  {
                      label: '90',
                      data: this.percentiles[this.gender][90].weight,
                      borderColor: 'grey',
                      backgroundColor: 'transparent',
                      fill: false,
                     pointBorderColor:"white"
                  },
                  {
                      label: '97',
                      data: this.percentiles[this.gender][97].weight,
                      borderColor: 'red',
                      backgroundColor: 'transparent',
                      fill: false,
                    pointBorderColor:"white"
                  }, // Kullanıcı verisini gösteren veri kümesi
                    {
                      label: 'Baby',
                      data: [{ x:this.ageRange.find(a=>{return a == this.babyCurrentMonth}), // Kullanıcının girdiği yaş
                        y:this.weight // Kullanıcının girdiği ağırlık
                      }],
                     
            
                      backgroundColor: 'blue', // Kullanıcı verisi için belirgin bir renk
                      borderColor: 'blue',
                      pointBackgroundColor: 'blue',
                      pointRadius: 6, // İşaretçinin boyutu
                      pointBorderWidth: 5, // İşaretçinin kenar genişliği
                      fill: false,
                      type: 'scatter', // Veri noktalarını göstermek için scatter tipi kullanılır
                      zIndex: 8,
                    }

              ] as ChartDataset<'line'>[],
          },
          options: {
              responsive: true,
              maintainAspectRatio: false, // Oranını korumadan boyutlanmasını sağlar
              scales: {
                  x: {
                      title: {
                          display: true,
                          text: 'Age (months)',
                      },
                      
                  },
                  y: {
                      title: {
                          display: true,
                          text: 'Weight (kg)',
                      },
                  },
              },
          },
      });

        new Chart(heightChartCtx, {
            type: 'line',
            data: {
                labels:this.ageRange,
                datasets: [
                    {
                        label: '3',
                        data: this.percentiles[this.gender][3].height,
                        borderColor: 'red',
                        backgroundColor: 'transparent',
                        pointBorderColor:"white",
                        fill: false,
                    },
                    {
                        label: '10',
                        data: this.percentiles[this.gender][10].height,
                        borderColor: 'grey',
                        backgroundColor: 'transparent',
                        fill: false,
                        pointBorderColor:"white"
                    },
                    {
                        label: '25',
                        data: this.percentiles[this.gender][25].height,
                        borderColor: 'grey',
                        backgroundColor: 'transparent',
                        fill: false,
                       pointBorderColor:"white"
                    },
                   
                   
                    {
                        label: '50',
                        data: this.percentiles[this.gender][50].height,
                        borderColor: 'green',
                        backgroundColor: 'transparent',
                        fill: false,
                        pointBorderColor:"white"
                    },
                    {
                        label: '75',
                        data: this.percentiles[this.gender][75].height,
                        borderColor: 'grey',
                        backgroundColor: 'transparent',
                        fill: false,
                        pointBorderColor:"white"
                    },
                    {
                        label: '90',
                        data: this.percentiles[this.gender][90].height,
                        borderColor: 'grey',
                        backgroundColor: 'transparent',
                        fill: false,
                       pointBorderColor:"white"
                    },
                    {
                        label: '97',
                        data: this.percentiles[this.gender][97].height,
                        borderColor: 'red',
                        backgroundColor: 'transparent',
                        fill: false,
                       pointBorderColor:"white"
                    },
                      // Kullanıcı verisini gösteren veri kümesi
                {
                    label: 'Baby',

                    data: [{ x:this.ageRange.find(a=>{return a == this.babyCurrentMonth}), 
                        y:this.height}],
                    backgroundColor: 'purple', // Kullanıcı verisi için belirgin bir renk
                    borderColor: 'purple',
                    pointBackgroundColor: 'purple',
                    pointRadius: 6, // İşaretçinin boyutu
                    pointBorderWidth: 5, // İşaretçinin kenar genişliği
                    fill: false,
                    type: 'scatter', // Veri noktalarını göstermek için scatter tipi kullanılır
                    zIndex: 8,
                }
                ] as ChartDataset<'line'>[],
            },
           options: {
              responsive: true,
              maintainAspectRatio: false, // Oranını korumadan boyutlanmasını sağlar
              scales: {
                  x: {
                      title: {
                          display: true,
                          text: 'Age (months)',
                      },
                  },
                  y: {
                      title: {
                          display: true,
                          text: 'Height(kg)',
                      },
                  },
              },
          },
        });
    }
    saveMeasurement() {
        const measurement = {
            birthDate: this.birthDate,
            measurementDate: this.measurementDate,
            weight: this.weight,
            height: this.height,
            gender: this.gender,
            weightPercentile: this.weightPercentile,
            heightPercentile: this.heightPercentile,
            

            
        
        };

        this.localStorageService.saveMeasurement(measurement);
        this.router.navigate(['/baby-profile']);
    }
    public goBack() {
        this.router.navigate(['/form']);
    }

  }


