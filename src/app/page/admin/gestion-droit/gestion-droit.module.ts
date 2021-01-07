import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionDroitPageRoutingModule } from './gestion-droit-routing.module';

import { GestionDroitPage } from './gestion-droit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionDroitPageRoutingModule
  ],
  declarations: [GestionDroitPage]
})
export class GestionDroitPageModule {}
