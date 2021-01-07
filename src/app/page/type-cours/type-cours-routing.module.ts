import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TypeCoursPage } from './type-cours.page';

const routes: Routes = [
  {
    path: '',
    component: TypeCoursPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TypeCoursPageRoutingModule {}
