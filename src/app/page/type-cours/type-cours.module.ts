import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TypeCoursPageRoutingModule } from './type-cours-routing.module';

import { TypeCoursPage } from './type-cours.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,    ReactiveFormsModule,
    IonicModule,
    TypeCoursPageRoutingModule
  ],
  declarations: [TypeCoursPage]
})
export class TypeCoursPageModule {}
