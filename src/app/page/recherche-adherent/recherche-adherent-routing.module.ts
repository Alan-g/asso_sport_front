import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RechercheAdherentPage } from './recherche-adherent.page';

const routes: Routes = [
  {
    path: '',
    component: RechercheAdherentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RechercheAdherentPageRoutingModule {}
