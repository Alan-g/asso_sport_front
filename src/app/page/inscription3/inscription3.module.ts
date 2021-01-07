import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Inscription3PageRoutingModule } from './inscription3-routing.module';

import { Inscription3Page } from './inscription3.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        Inscription3PageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [Inscription3Page]
})
export class Inscription3PageModule {}
