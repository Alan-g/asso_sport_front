import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Inscription4Page } from './inscription4.page';

const routes: Routes = [
  {
    path: '',
    component: Inscription4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Inscription4PageRoutingModule {}
