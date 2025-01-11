import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BabyProfilePageRoutingModule } from './baby-profile-routing.module';

import { BabyProfilePage } from './baby-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BabyProfilePageRoutingModule
  ],
  declarations: [BabyProfilePage]
})
export class BabyProfilePageModule {}
