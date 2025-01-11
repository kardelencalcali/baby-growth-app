import { Component, Input,} from '@angular/core';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';


@Component({
  selector: 'app-boys-growth-chart',
  templateUrl: './boys-growth-chart.component.html',
  styleUrls: ['./boys-growth-chart.component.scss'],
  standalone:true
})


export class BoysGrowthChartComponent {
  public lineChartData: ChartDataset<'line'>[] = [
{

    data:[2.58,	2.85,	3.13,	3.43,	3.73,	4.00,	4.27,
          4.75,	5.26,	5.79,	6.38,	6.99,	7.54,	8.10,
          6.21,	6.79,	7.41,	8.12,	8.85,	9.54,	10.25,
          7.27,	7.87,	8.51,	9.26,	10.06,10.81,11.58,
          7.96,	8.61,	9.32,	10.16,11.05,11.92,12.82,
          8.61,	9.28,	10.01,10.89,11.83,12.75, 13.72,
          9.13,	9.82,	10.58,11.49,12.48,13.46,14.49,
          10.12,10.85,11.66	,12.66,13.76,14.86,16.05,
          11.06,11.84,12.71	,13.80,15.04,16.29,17.69,
           11.81,12.65,13.61,14.83,16.24,17.71,19.39],

    label:'weight (kg)',
    fill:false,
    borderColor:'blue',
    backgroundColor: 'rgba(0, 0, 255, 0.3)',
},
{data:[45.9,47.2,	48.5,	50.0,	51.5,	52.9,	54.2,
      56.2,	57.8,	59.5,	61.3,	63.2,	64.8,	66.4,
      62.8,	64.5,	66.2,	68.8,	69.9,	71.6,	73.2,
      67.4,	69.1,	70.9,	72.8,	74.7,	76.4,	78.1,
      70.8,	72.7,	74.7,	76.9,	79.1,	81.1,	83.0,
      73.8,	75.8,	77.9,	80.2,	82.5,	84.5,	86.6,
      76.4,	78.5,	80.7,	83.1,	85.5,	87.7,	89.8,
      81.0,	83.3,	85.6,	88.2,	90.8,	93.2,	95.5,
      85.3,	87.6,	90.0,	92.6,	95.3,	97.6,	100.0,
      89.3,	91.7,	94.1,	96.8,	99.4,	101.8,104.2],
  
  label:'height(cm)',
  fill:false,
  borderColor:'green',
  backgroundColor:'rgba(0, 255, 0, 0.3)',
},
  {
    data: [ 32.3,	33.2,	34.0,	34.9,	35.9,	36.7,	37.5,
            38.5,	39.3,	40.2,	41.1,	42.0,	42.8,	43.7,
            41.3,	42.2,	43.1,	44.0,	45.0,	45.9,	46.7,
            43.1,	44.0,	44.9,	45.8,	46.8,	47.7,	48.6,
            44.3,	45.2,	46.1,	47.1,	48.0,	48.9,	49.8,
            45.0,	45.9,	46.8,	47.8,	48.8,	49.7,	50.6,
            45.6,	46.5,	47.4,	48.4,	49.4,	50.3,	51.2,
            46.4,	47.3,	48.3,	49.3,	50.3,	51.2,	52.1,
            46.9,	47.8,	48.8,	49.8,	50.8,	51.8,	52.7,
            47.1,	48.0,	49.0,	50.0,	51.1,	52.0,	52.9],
      label: 'BÇ (cm)',
      fill: false,
      borderColor: 'purple',
      backgroundColor: 'rgba(128, 0, 128, 0.3)',
  }
];

  public lineChartLabels: string[] = ['Doğum', '3 Ay', '6 Ay', '9 Ay', '12 Ay', '15 Ay', '18 Ay', '24 Ay', '30 Ay', '36 Ay'];

  public lineChartOptions: ChartOptions = {
    responsive: true,
  };

  public lineChartType: ChartType = 'line';
}

