import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Inscription2PageRoutingModule } from './inscription2-routing.module';

import { Inscription2Page } from './inscription2.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        Inscription2PageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [Inscription2Page]
})
export class Inscription2PageModule {}
