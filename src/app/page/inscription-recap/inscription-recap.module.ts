import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InscriptionRecapPageRoutingModule } from './inscription-recap-routing.module';

import { InscriptionRecapPage } from './inscription-recap.page';
import {ImportAssoModule} from '../../import-asso/import-asso.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        InscriptionRecapPageRoutingModule,
        ImportAssoModule
    ],
  declarations: [InscriptionRecapPage]
})
export class InscriptionRecapPageModule {}
