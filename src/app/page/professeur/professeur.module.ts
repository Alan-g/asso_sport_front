import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfesseurPageRoutingModule } from './professeur-routing.module';

import { ProfesseurPage } from './professeur.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProfesseurPageRoutingModule
  ],
  declarations: [ProfesseurPage]
})
export class ProfesseurPageModule {}
