import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MontantCourPage } from './montant-cour.page';

const routes: Routes = [
  {
    path: '',
    component: MontantCourPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MontantCourPageRoutingModule {}
