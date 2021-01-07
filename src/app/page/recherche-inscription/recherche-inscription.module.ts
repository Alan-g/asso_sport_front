import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RechercheInscriptionPageRoutingModule } from './recherche-inscription-routing.module';

import { RechercheInscriptionPage } from './recherche-inscription.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RechercheInscriptionPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [RechercheInscriptionPage]
})
export class RechercheInscriptionPageModule {}
