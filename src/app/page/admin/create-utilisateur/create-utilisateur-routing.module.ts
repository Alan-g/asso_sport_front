import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateUtilisateurPage } from './create-utilisateur.page';

const routes: Routes = [
  {
    path: '',
    component: CreateUtilisateurPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateUtilisateurPageRoutingModule {}
