import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RechercheAdherentPageRoutingModule } from './recherche-adherent-routing.module';

import { RechercheAdherentPage } from './recherche-adherent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RechercheAdherentPageRoutingModule
  ],
  declarations: [RechercheAdherentPage]
})
export class RechercheAdherentPageModule {}
