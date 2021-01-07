import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Inscription3Page } from './inscription3.page';

const routes: Routes = [
  {
    path: '',
    component: Inscription3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Inscription3PageRoutingModule {}
