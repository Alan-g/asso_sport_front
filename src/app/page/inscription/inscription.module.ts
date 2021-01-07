import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InscriptionPageRoutingModule } from './inscription-routing.module';

import { InscriptionPage } from './inscription.page';
import {ImportAssoModule} from '../../import-asso/import-asso.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        InscriptionPageRoutingModule,
        ReactiveFormsModule,
        ImportAssoModule
    ],
  declarations: [InscriptionPage]
})
export class InscriptionPageModule {}
