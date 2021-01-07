import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InscriptionUpdatePage } from './inscription-update.page';

const routes: Routes = [
  {
    path: '',
    component: InscriptionUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscriptionUpdatePageRoutingModule {}
