import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionRolePageRoutingModule } from './gestion-role-routing.module';

import { GestionRolePage } from './gestion-role.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
      ReactiveFormsModule,
    IonicModule,
    GestionRolePageRoutingModule
  ],
  declarations: [GestionRolePage]
})
export class GestionRolePageModule {}
