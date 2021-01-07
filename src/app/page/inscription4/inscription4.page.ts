import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../service/login.service';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Paiement} from '../../class/Paiement';
import {DatePipe} from '@angular/common';
import {Cours} from '../../class/Cours';
import {ModalController} from '@ionic/angular';
import {SearchAdherentComponent} from '../../component/search-adherent/search-adherent.component';
import {Adherent} from '../../class/Adherent';
import {SearchPaiementComponent} from '../../component/search-paiement/search-paiement.component';

@Component({
  selector: 'app-inscription4',
  templateUrl: './inscription4.page.html',
  styleUrls: ['./inscription4.page.scss'],
})
export class Inscription4Page implements OnInit {
  datepipe = new DatePipe('en-US');
  paiements: Paiement[] = [];
  formPaiement: FormGroup;
  max: number = (new Date()).getFullYear() + 1;
  min: number = (new Date()).getFullYear() - 1;
  params = {adherent: null, inscription: null, cours: null, paiements: null};

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private modalController: ModalController) {
    this.getParam();
    this.formPaiement = this.formBuilder.group({
      payeurs: ['',  Validators.compose([ Validators.maxLength(100), Validators.required])],
      montant: ['',  Validators.compose([  Validators.required, Validators.min(0)])],
      banque: ['',  Validators.compose([ Validators.maxLength(300), Validators.required])],
      dateEncaissement: ['',  Validators.compose([ Validators.required])],
      numeroCheque: ['',  Validators.compose([ Validators.maxLength(200), Validators.required])],
    });
  }

  add(){
    this.paiements.push(new Paiement(null, this.formPaiement.value.payeurs, this.formPaiement.value.montant,
        this.formPaiement.value.banque, this.formPaiement.value.dateEncaissement, this.formPaiement.value.numeroCheque));
    this.formPaiement.reset();
  }

  remove(paiement){
    this.paiements.splice(this.paiements.indexOf(paiement), 1);

  }
  ngOnInit() {
  }

  addPaiement(){
    document.getElementById('paiement_question').style.display = 'none';
    document.getElementById('paiement').style.display = 'block';
    document.getElementById('footer_p').style.display = 'block';
  }

  skip(){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        adherent: this.params.adherent,
        inscription: this.params.inscription,
        cours: this.params.cours,
        paiements: JSON.stringify(this.paiements),
      }
    };
    this.router.navigate(['inscription/validation'], navigationExtras);
  }

  previous(){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        adherent: this.params.adherent,
        inscription: this.params.inscription,
        cours: this.params.cours,
        paiements: JSON.stringify(this.paiements),
      }
    };
    this.router.navigate(['inscription/cours'], navigationExtras);
  }

  private getParam(){
    this.route.queryParams.subscribe(params => {
      if (params && params.adherent) {
        this.params.adherent = params.adherent;
        this.params.inscription = params.inscription;
        this.params.cours = params.cours;
        this.params.paiements = params.paiements;
      }
    });
  }

  ionViewWillEnter() {
    this.getParam();
    if (this.params.paiements){
      this.addPaiement();
      this.paiements = (JSON.parse(this.params.paiements) as Paiement[]);
    }
  }

  async openSearchModal(){
      const modal = await this.modalController.create({
        component: SearchPaiementComponent,
        // cssClass: 'my-custom-class'
      });
      modal.onDidDismiss().then((data) => {
        const paiement = (data.data as Paiement);
        this.formPaiement.reset();
        if (paiement) {
          this.paiements.push(paiement);
        }
      });
      return await modal.present();
  }
}
