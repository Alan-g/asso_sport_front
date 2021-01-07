import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionRolePage } from './gestion-role.page';

const routes: Routes = [
  {
    path: '',
    component: GestionRolePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionRolePageRoutingModule {}
