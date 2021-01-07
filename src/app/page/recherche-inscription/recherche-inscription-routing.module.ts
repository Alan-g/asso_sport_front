import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RechercheInscriptionPage } from './recherche-inscription.page';

const routes: Routes = [
  {
    path: '',
    component: RechercheInscriptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RechercheInscriptionPageRoutingModule {}
