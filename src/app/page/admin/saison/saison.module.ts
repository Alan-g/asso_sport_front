import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SaisonPageRoutingModule } from './saison-routing.module';

import { SaisonPage } from './saison.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SaisonPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [SaisonPage]
})
export class SaisonPageModule {}
