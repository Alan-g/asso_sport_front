import { Component, OnInit } from '@angular/core';
import {AdherentService} from '../../service/adherent.service';
import {Adherent} from '../../class/Adherent';
import {ModalController} from '@ionic/angular';
import {AjoutFiltreComponent} from '../../component/ajout-filtre/ajout-filtre.component';
import {AnneeService} from '../../service/annee.service';
import {Annee} from '../../class/Annee';
import {NavigationExtras, Router} from '@angular/router';
import {Cours} from '../../class/Cours';
import {CoursService} from '../../service/cours.service';

@Component({
  selector: 'app-recherche-inscription',
  templateUrl: './recherche-inscription.page.html',
  styleUrls: ['./recherche-inscription.page.scss'],
})
export class RechercheInscriptionPage implements OnInit {

  adherents: Adherent[] = [];
  name = '';
  annees: Annee[] = [];
  anneeSelect = null;
  filtres: {filtre: string, valeur: string}[] = [];
  cours: Cours[];
  load = false;

  constructor(private adherentService: AdherentService, private modalController: ModalController, private anneeService: AnneeService,
              private router: Router, private coursService: CoursService) { }

  async addFiltre(){
    const modal = await this.modalController.create({
      component: AjoutFiltreComponent,
    });
    modal.onDidDismiss().then((data) => {
      if (data.data){
        const datas = data.data as {filtre: string, valeur: string}[];
        datas.forEach( (filtre) => {
          let add = false;
          this.filtres.forEach(filtreAdd => {
            if (filtreAdd.filtre === filtre.filtre){
              filtreAdd.valeur = filtre.valeur;
              add = true;
            }
          });
          if (add === false){
            this.filtres.push(filtre);
          }
        });
        this.adherentService.getByName(this.name, this.convertFilter()).subscribe(x => {
          this.adherents = x;
        });
      }
    });
    return await modal.present();
  }

  search(event) {
    this.load = true;
    if (event.detail.value !== '' || this.filtres.length !== 0) {
      const value = event.detail.value;
      this.name = value;
      this.adherentService.getByName(value, this.convertFilter()).subscribe(x => {
        this.adherents = x === null ? [] : x;
        this.load = false;
      });
    }else {
      this.adherents = [];
      this.load = false;
    }
  }

  ionViewWillEnter() {
    this.coursService.getAll().subscribe(cours =>  {
      this.cours = cours;
    });
    this.anneeService.getAll().subscribe(annees => {
      this.annees = annees;
      this.annees.forEach(annee => {
        if (annee.actif){
          this.anneeSelect = annee.libelle;
        }
      });
    });
  }

  onSelectOther(){
    if (this.filtres.length !== 0) {
      this.adherentService.getByName(name, this.convertFilter()).subscribe(x => {
        this.adherents = x;
      });
    }
  }
  click(id){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        id,
        annee: this.anneeSelect,
      }};
    this.router.navigate(['inscription/details'], navigationExtras);
  }
  ngOnInit() {
  }

  delete(filtre){
    this.filtres.splice(this.filtres.indexOf(filtre), 1);
    if (this.filtres.length !== 0 || this.name !== '') {
      this.adherentService.getByName(this.name, this.convertFilter()).subscribe(x => {
        this.adherents = x;
      });
    } else {
      this.adherents = [];
    }
  }

  convertFilter(){
    const filtresConvert =  [];
    this.filtres.forEach( (filtre) => {
      filtresConvert.push({key: filtre.filtre, valeur: filtre.valeur});
    });
    filtresConvert.push({key: 'annee', valeur: this.anneeSelect});
    return filtresConvert;
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
