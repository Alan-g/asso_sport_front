import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaisonPage } from './saison.page';

const routes: Routes = [
  {
    path: '',
    component: SaisonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaisonPageRoutingModule {}
