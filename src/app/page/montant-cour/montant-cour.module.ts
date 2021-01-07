import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MontantCourPageRoutingModule } from './montant-cour-routing.module';

import { MontantCourPage } from './montant-cour.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
      ReactiveFormsModule,
    IonicModule,
    MontantCourPageRoutingModule
  ],
  declarations: [MontantCourPage]
})
export class MontantCourPageModule {}
