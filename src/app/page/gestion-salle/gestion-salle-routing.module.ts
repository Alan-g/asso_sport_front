import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionSallePage } from './gestion-salle.page';

const routes: Routes = [
  {
    path: '',
    component: GestionSallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionSallePageRoutingModule {}
