import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursGestionPage } from './cours-gestion.page';

const routes: Routes = [
  {
    path: '',
    component: CoursGestionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursGestionPageRoutingModule {}
