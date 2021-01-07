import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SearchAdherentComponent} from '../component/search-adherent/search-adherent.component';
import {IonicModule} from '@ionic/angular';
import {ExpandableComponent} from '../component/expandable/expandable.component';
import {SearchPaiementComponent} from '../component/search-paiement/search-paiement.component';
import {AddRemoveDroitCommand} from '../class/command/AddRemoveDroitCommand';
import {AddRoleComponent} from '../component/add-role/add-role.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AjoutTarifComponent} from '../component/ajout-tarif/ajout-tarif.component';
import {AjoutFiltreComponent} from '../component/ajout-filtre/ajout-filtre.component';
import {CreateProfComponent} from '../component/create-prof/create-prof.component';
import {CreateCoursComponent} from '../component/create-cours/create-cours.component';
import {CreateTypeCoursComponent} from '../component/create-type-cours/create-type-cours.component';
import {CreateSalleCommand} from '../class/command/CreateSalleCommand';
import {SalleComponent} from '../component/salle/salle.component';



@NgModule({
  declarations: [SearchAdherentComponent, ExpandableComponent, SearchPaiementComponent, AddRoleComponent, AjoutTarifComponent, AjoutFiltreComponent, CreateProfComponent, CreateCoursComponent, CreateTypeCoursComponent, SalleComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [ExpandableComponent, SearchAdherentComponent, SearchPaiementComponent, AddRoleComponent, AjoutTarifComponent, AjoutFiltreComponent, CreateProfComponent, CreateCoursComponent, CreateTypeCoursComponent, SalleComponent]
})
export class ImportAssoModule { }
