import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionSallePageRoutingModule } from './gestion-salle-routing.module';

import { GestionSallePage } from './gestion-salle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    IonicModule,
    GestionSallePageRoutingModule
  ],
  declarations: [GestionSallePage]
})
export class GestionSallePageModule {}
