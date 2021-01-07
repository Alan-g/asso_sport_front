import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InscriptionRecapPage } from './inscription-recap.page';

const routes: Routes = [
  {
    path: '',
    component: InscriptionRecapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscriptionRecapPageRoutingModule {}
