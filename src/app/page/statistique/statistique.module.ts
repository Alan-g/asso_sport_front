import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatistiquePageRoutingModule } from './statistique-routing.module';

import { StatistiquePage } from './statistique.page';
import {Ng2GoogleChartsModule} from 'ng2-google-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2GoogleChartsModule,
    StatistiquePageRoutingModule
  ],
  declarations: [StatistiquePage]
})
export class StatistiquePageModule {}
