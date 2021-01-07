import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InscriptionUpdatePageRoutingModule } from './inscription-update-routing.module';

import { InscriptionUpdatePage } from './inscription-update.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        InscriptionUpdatePageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [InscriptionUpdatePage]
})
export class InscriptionUpdatePageModule {}
