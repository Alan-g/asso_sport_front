import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Inscription2Page } from './inscription2.page';

const routes: Routes = [
  {
    path: '',
    component: Inscription2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Inscription2PageRoutingModule {}
