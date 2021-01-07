import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifUtilisateurPageRoutingModule } from './modif-utilisateur-routing.module';

import { ModifUtilisateurPage } from './modif-utilisateur.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifUtilisateurPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModifUtilisateurPage]
})
export class ModifUtilisateurPageModule {}
