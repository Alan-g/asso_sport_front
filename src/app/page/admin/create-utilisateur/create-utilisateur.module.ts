import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateUtilisateurPageRoutingModule } from './create-utilisateur-routing.module';

import { CreateUtilisateurPage } from './create-utilisateur.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CreateUtilisateurPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [CreateUtilisateurPage]
})
export class CreateUtilisateurPageModule {}
