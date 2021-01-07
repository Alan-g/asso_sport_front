import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionDroitPage } from './gestion-droit.page';

const routes: Routes = [
  {
    path: '',
    component: GestionDroitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionDroitPageRoutingModule {}
