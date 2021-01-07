import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Inscription4PageRoutingModule } from './inscription4-routing.module';

import { Inscription4Page } from './inscription4.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        Inscription4PageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [Inscription4Page]
})
export class Inscription4PageModule {}
