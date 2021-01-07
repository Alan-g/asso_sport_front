import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../service/login.service';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {MenuController, ModalController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SearchAdherentComponent} from '../../component/search-adherent/search-adherent.component';
import {Adherent} from '../../class/Adherent';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {

  formAdherent: FormGroup;
  adherent: Adherent;
  params = {adherent: null, inscription: null, cours: null, paiements: null};

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private modalController: ModalController) {
    this.formAdherent = this.formBuilder.group({
      genre: ['',  Validators.required],
      nom: ['',  Validators.compose([ Validators.maxLength(100), Validators.required])],
      prenom: ['',  Validators.compose([ Validators.maxLength(100), Validators.required])],
      adresse1: ['',  Validators.compose([ Validators.maxLength(300)])],
      adresse2: ['',  Validators.compose([ Validators.maxLength(300)])],
      adresse3: ['',  Validators.compose([ Validators.maxLength(300)])],
      codePostal: ['',  Validators.compose([ Validators.maxLength(5), Validators.minLength(5), Validators.required])],
      commune: ['',  Validators.compose([ Validators.maxLength(300), Validators.required])],
      telephone: ['',  Validators.compose([ Validators.maxLength(20), Validators.minLength(10)])],
      mail: ['',  Validators.compose([ Validators.email])],
      dateNaissance: ['', ],
    });
  }

  ngOnInit() {
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
    this.route.queryParams.subscribe(params => {
        if (params ) {
          if (!params.adherent) {
            this.adherent = null;
            this.formAdherent.reset();
            document.getElementById('first_option').style.display = 'block';
            document.getElementById('adherent').style.display = 'none';
            // @ts-ignore
            document.getElementById('segment').value = 'new';
          } else {
            this.getParam();
          }
        }
    });
  }

  addAdherent(newAd: boolean) {
    document.getElementById('first_option').style.display = 'none';
    document.getElementById('adherent').style.display = 'block';
    if (newAd) {
      // @ts-ignore
      document.getElementById('segment').value = 'new';
    } else {
      // @ts-ignore
      document.getElementById('segment').value = 'old';
    }
  }

  validate(){
    if (this.adherent){
      this.adherent = new Adherent(this.adherent.id, this.formAdherent.value.genre, this.formAdherent.value.nom,
          this.formAdherent.value.prenom, this.formAdherent.value.adresse1, this.formAdherent.value.adresse2,
          this.formAdherent.value.adresse3, this.formAdherent.value.codePostal, this.formAdherent.value.commune,
          this.formAdherent.value.telephone, this.formAdherent.value.mail, this.formAdherent.value.dateNaissance);
    } else {
      this.adherent = new Adherent(null, this.formAdherent.value.genre, this.formAdherent.value.nom,
          this.formAdherent.value.prenom, this.formAdherent.value.adresse1, this.formAdherent.value.adresse2,
          this.formAdherent.value.adresse3, this.formAdherent.value.codePostal, this.formAdherent.value.commune,
          this.formAdherent.value.telephone, this.formAdherent.value.mail, this.formAdherent.value.dateNaissance);
    }
    const navigationExtras: NavigationExtras = {
      queryParams: {
        adherent: JSON.stringify(this.adherent),
        inscription: this.params.inscription,
        cours: this.params.cours,
        paiements: this.params.paiements,
      }
    };
    this.router.navigate(['inscription/infos'], navigationExtras);
  }

  async openSearchModal(segment: any){
    if (segment.detail.value === 'old') {
      const modal = await this.modalController.create({
        component: SearchAdherentComponent,
        cssClass: 'my-custom-class'
      });
      modal.onDidDismiss().then((data) => {
        this.adherent = (data.data as Adherent);
        this.formAdherent.reset();
        if (this.adherent) {
          this.formAdherent.setValue({
            genre: this.adherent.genre,
            nom: this.adherent.nom,
            prenom: this.adherent.prenom,
            adresse1: this.adherent.adresse1,
            adresse2: this.adherent.adresse2,
            adresse3: this.adherent.adresse3,
            codePostal: this.adherent.code_postal,
            commune: this.adherent.commune,
            telephone: this.adherent.telephone,
            mail: this.adherent.mail,
            dateNaissance: this.adherent.date_naissance
          });
        } else {
          // @ts-ignore
          document.getElementById('segment').value = 'new';
        }
      });
      return await modal.present();
    } else {
      this.adherent = null;
      this.formAdherent.reset();
    }
  }
}
