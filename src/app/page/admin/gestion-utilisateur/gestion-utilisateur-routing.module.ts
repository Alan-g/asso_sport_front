import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionUtilisateurPage } from './gestion-utilisateur.page';

const routes: Routes = [
  {
    path: '',
    component: GestionUtilisateurPage
  },
  {
    path: ':idUser',
    loadChildren: () => import('../modif-utilisateur/modif-utilisateur.module').then(m => m.ModifUtilisateurPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionUtilisateurPageRoutingModule {}
