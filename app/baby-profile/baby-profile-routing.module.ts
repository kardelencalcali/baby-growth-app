import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BabyProfilePage } from './baby-profile.page';

const routes: Routes = [
  {
    path: '',
    component: BabyProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BabyProfilePageRoutingModule {}
