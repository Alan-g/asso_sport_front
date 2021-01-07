import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../service/login.service';
import {ActivatedRoute, NavigationExtras, Route, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavController} from '@ionic/angular';
import {InscriptionDTO} from '../../class/InscriptionDTO';
import {AnneeService} from '../../service/annee.service';
import {Annee} from '../../class/Annee';

@Component({
  selector: 'app-inscription2',
  templateUrl: './inscription2.page.html',
  styleUrls: ['./inscription2.page.scss'],
})
export class Inscription2Page implements OnInit {
  max: number = (new Date()).getFullYear() + 1;
  min: number =(new Date()).getFullYear() - 1;
  formInscription: FormGroup;
  annees: Annee[] = [];
  params = {adherent: null, inscription: null, cours: null, paiements: null};
  constructor(private router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute, private anneeService: AnneeService) {
    this.formInscription = this.formBuilder.group({
      annee: ['',  Validators.required],
      certificat: [false,  Validators.required],
      enveloppe: [false,  Validators.required],
      reglement: [false,  Validators.required],
      comite_entreprise: [false,  Validators.required],
      autorisation_parental: [false,  Validators.required],
      date_envoi_ce: ['',],
      questionnaire_sante: ['',  Validators.required],
      reglement_interieur: [false,  Validators.required],
      essai: [false,  Validators.required],
      cart_mra: [false,  Validators.required],
      commentaire: ['',  Validators.compose([ Validators.maxLength(300)])],
    });
    this.getParam();
    this.anneeService.getAll().subscribe( annees => {
      this.annees = annees;
      this.annees.forEach( annee =>{
        if (annee.actif) {
          this.formInscription.patchValue({
            annee: annee.libelle});
        }
    });
  });
  }
  getValue(){
    let value = null;
    this.annees.forEach( annee =>{
      if (annee.actif) {
        value = annee.libelle;
      }
    });
    return value;
  }

  getParam(){
    this.route.queryParams.subscribe(params => {
      if (params && params.adherent) {
        this.params.adherent = params.adherent;
        this.params.inscription = params.inscription;
        this.params.cours = params.cours;
        this.params.paiements = params.paiements;
      }
      if (this.params.inscription && this.formInscription) {
        const inscription = JSON.parse(this.params.inscription) as InscriptionDTO;
        this.formInscription.setValue({
          annee: inscription.annee,
          certificat: inscription.certificat,
          enveloppe: inscription.enveloppe,
          reglement: inscription.reglement,
          comite_entreprise: inscription.comite_entreprise,
          autorisation_parental: inscription.autorisation_parental,
          date_envoi_ce: inscription.date_envoi_ce,
          questionnaire_sante: inscription.questionnaire_sante,
          reglement_interieur: inscription.reglement_interieur,
          essai: inscription.essai,
          cart_mra: inscription.cart_mra,
          commentaire: inscription.commentaire });
      }
    });
  }

  onSelect(event) {
    if(event.detail.value === 'Positif'){
      document.getElementById('certificatM').style.display = 'block';
    } else {
      document.getElementById('certificatM').style.display = 'none';
    }
  }

  previous(){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        adherent: this.params.adherent,
        inscription: JSON.stringify(new InscriptionDTO(null, null, this.formInscription.value.annee, this.formInscription.value.certificat, this.formInscription.value.enveloppe,
            this.formInscription.value.reglement, this.formInscription.value.comite_entreprise, this.formInscription.value.autorisation_parental, this.formInscription.value.commentaire,
            0, this.formInscription.value.questionnaire_sante, this.formInscription.value.date_envoi_ce, this.formInscription.value.reglement_interieur, this.formInscription.value.essai, this.formInscription.value.cart_mra)),
        cours: this.params.cours,
        paiements: this.params.paiements,
      }
    };
    this.router.navigate(['inscription'], navigationExtras);
  }
  validate(){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        adherent: this.params.adherent,
        inscription: JSON.stringify(new InscriptionDTO(null, null, this.formInscription.value.annee, this.formInscription.value.certificat, this.formInscription.value.enveloppe,
            this.formInscription.value.reglement, this.formInscription.value.comite_entreprise, this.formInscription.value.autorisation_parental, this.formInscription.value.commentaire,
            0, this.formInscription.value.questionnaire_sante, this.formInscription.value.date_envoi_ce, this.formInscription.value.reglement_interieur, this.formInscription.value.essai, this.formInscription.value.cart_mra)),
        cours: this.params.cours,
        paiements: this.params.paiements,
      }
    };
    this.router.navigate(['inscription/cours'], navigationExtras);
  }
  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getParam();
  }

}
