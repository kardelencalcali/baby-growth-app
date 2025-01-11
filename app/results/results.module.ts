import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResultsPageRoutingModule } from './results-routing.module';

import { ResultsPage } from './results.page';
import { BoysGrowthChartComponent } from '../boys-growth-chart/boys-growth-chart.component';
import {BaseChartDirective} from "ng2-charts";
import { NgChartsModule } from 'ng2-charts';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ResultsPageRoutingModule,
        BoysGrowthChartComponent,
        NgChartsModule,
       
    ],
  declarations: [ResultsPage,],schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ResultsPageModule { }
