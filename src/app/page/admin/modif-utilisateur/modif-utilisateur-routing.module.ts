import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifUtilisateurPage } from './modif-utilisateur.page';

const routes: Routes = [
  {
    path: '',
    component: ModifUtilisateurPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifUtilisateurPageRoutingModule {}
