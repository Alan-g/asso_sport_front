import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../service/login.service';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {Cours} from '../../class/Cours';
import {Adherent} from '../../class/Adherent';
import {InscriptionDTO} from '../../class/InscriptionDTO';
import {Paiement} from '../../class/Paiement';
import {DatePipe} from '@angular/common';
import {CreateInscriptionCommand} from '../../class/command/CreateInscriptionCommand';
import {InscriptionService} from '../../service/inscription.service';
import {LoadingController, ToastController} from '@ionic/angular';
import {collectExternalReferences} from '@angular/compiler';

@Component({
  selector: 'app-inscription-recap',
  templateUrl: './inscription-recap.page.html',
  styleUrls: ['./inscription-recap.page.scss'],
})
export class InscriptionRecapPage implements OnInit {
  params = {adherent: null, inscription: null, cours: null, paiements: null};
  collapseAdherent = {expanded: false};
  collapseInscription = {expanded: false};
  collapseCours = {expanded: false};
  collapsePaiement = {expanded: false};
  adherent: Adherent;
  inscription: InscriptionDTO;
  cours: Cours[];
  paiements: Paiement[];
  datepipe = new DatePipe('en-US');
  constructor(private route: ActivatedRoute, private router: Router, private inscriptionService: InscriptionService, private loadingController: LoadingController, private toastController: ToastController) {
    this.getParam();
  }

  ngOnInit() {
  }

  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      if (item === this.collapseAdherent) {
        this.collapseAdherent.expanded = !item.expanded;
      } else if (item === this.collapseInscription) {
        this.collapseInscription.expanded = !item.expanded;
      }  else if (item === this.collapsePaiement) {
        this.collapsePaiement.expanded = !item.expanded;
      }  else if (item === this.collapseCours) {
        this.collapseCours.expanded = !item.expanded;
      }
    }
  }


  async validate(){
    const loading = await this.loadingController.create({
      message: 'Enregistrement en cours ...',
    });
    await loading.present();
    const createCommand = CreateInscriptionCommand.init(this.adherent, this.inscription, this.cours, this.paiements);
    this.inscriptionService.create(createCommand).subscribe(() => {
      loading.dismiss(); this.presentToast('Inscription ajoutée avec succès', 'success'); this.router.navigate(['/inscription']);
    }, () => { loading.dismiss(); this.presentToast('Erreur lors de l\'enregistrement de l\'inscription, ressayer plus tard', 'danger'); });
  }
  async presentToast(message, color) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
    });
    toast.present();
  }

  update(url) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        adherent: this.params.adherent,
        inscription: this.params.inscription,
        cours: this.params.cours,
        paiements: this.params.paiements,
      }
    };
    this.router.navigate([url], navigationExtras);
  }

  previous(){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        adherent: this.params.adherent,
        inscription: this.params.inscription,
        cours: this.params.cours,
        paiements: this.params.paiements,
      }
    };
    this.router.navigate(['inscription/paiement'], navigationExtras);
  }

  private getParam(){
    this.route.queryParams.subscribe(params => {
      if (params && params.adherent) {
        this.params.adherent = params.adherent;
        this.params.inscription = params.inscription;
        this.params.cours = params.cours;
        this.params.paiements = params.paiements;
        this.adherent = JSON.parse(this.params.adherent) as Adherent;
        this.inscription = JSON.parse(this.params.inscription) as InscriptionDTO;
        this.cours = JSON.parse(this.params.cours) as Cours[];
        this.paiements = JSON.parse(this.params.paiements) as Paiement[];
      }
    });
  }

  ionViewWillEnter() {
    this.getParam();
  }

}
