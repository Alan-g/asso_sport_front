import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {CoursService} from '../../service/cours.service';
import {Cours} from '../../class/Cours';

@Component({
  selector: 'app-ajout-filtre',
  templateUrl: './ajout-filtre.component.html',
  styleUrls: ['./ajout-filtre.component.scss'],
})
export class AjoutFiltreComponent implements OnInit {
  customActionSheetOptions: any = {
    cssClass: 'custom',
  };
  filtre = '';
  valeur = '';
  filtres: {filtre: string, valeur: string}[] = [];
  cours: Cours[];
  constructor(private modalController: ModalController, private coursService: CoursService) {
    this.coursService.getAll().subscribe(cours => {
      this.cours = cours;
    });
  }

  ngOnInit() {}

  delete(filtre){
    this.filtres.splice(this.filtres.indexOf(filtre), 1);
  }

  close(){
    this.modalController.dismiss();
  }

  ajoutFiltre(){
    if (this.filtre !== '' && this.valeur !== '') {
        let add = false;
        this.filtres.forEach(filtre => {
          if (filtre.filtre === this.filtre){
            filtre.valeur = this.valeur;
            add = true;
          }
        });
        if (add === false){
          this.filtres.push({filtre: this.filtre, valeur: this.valeur});
        }
        this.filtre = '';
        this.valeur = '';
    }
  }

  validate(){
    this.modalController.dismiss(this.filtres);

  }

  affichageCours(id){
    let affichage = '';
    this.cours.forEach(cour => {
      if (cour.id === id){
        affichage = '' + cour.jour + ' - ' +  cour.typeCours.libelle + ' de ' + cour.heure_debut + ' à ' + cour.heure_fin;
      }
    });
    return affichage;
  }

  convert(valeur: string) {
    if (valeur === 'certificat') {
      return 'Certificat';
    } else if (valeur === 'enveloppe') {
      return 'Enveloppe';
    } else if (valeur === 'reglement') {
      return 'Règlement Financier';
    } else if (valeur === 'comite_entreprise') {
      return 'Comite Entreprise';
    } else if (valeur === 'autorisation_parental') {
      return 'Autorisation Parental';
    } else if (valeur === 'questionnaire_sante') {
      return 'Questionnaire Sante';
    } else if (valeur === 'reglement_interieur') {
      return 'Règlement Interieur';
    } else if (valeur === 'essai') {
      return 'Essai';
    } else if (valeur === 'cart_mra') {
      return 'Carte M\'ra';
    }else if (valeur === 'cours') {
      return 'Cours';
    }
  }

}
