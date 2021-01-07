import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Adherent} from '../../class/Adherent';
import {Cours} from '../../class/Cours';
import {Paiement} from '../../class/Paiement';
import {InscriptionDTO} from '../../class/InscriptionDTO';
import {DatePipe} from '@angular/common';
import {AdherentService} from '../../service/adherent.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadingController, ModalController, ToastController} from '@ionic/angular';
import {AnneeService} from '../../service/annee.service';
import {InscriptionService} from '../../service/inscription.service';
import {LoginService} from '../../service/login.service';
import {CoursService} from '../../service/cours.service';
import {PaiementService} from '../../service/paiement.service';
import {UpdateInscriptionCommand} from '../../class/command/UpdateInscriptionCommand';
import {AddCoursInscriptionCommand} from '../../class/command/AddCoursInscriptionCommand';
import {SearchPaiementComponent} from '../../component/search-paiement/search-paiement.component';
import {UpdatePaiementInscriptionCommand} from '../../class/command/UpdatePaiementInscriptionCommand';

@Component({
  selector: 'app-inscription-update',
  templateUrl: './inscription-update.page.html',
  styleUrls: ['./inscription-update.page.scss'],
})
export class InscriptionUpdatePage implements OnInit {
  formInscription: FormGroup;
  adherent: Adherent;
  update = false;
  updatePaiement = false;
  updateCours = false;
  cours: Cours[] = [];
  coursAdd: Cours[] = [];
  coursRemove: Cours[] = [];
  paiements: Paiement[] = [];
  paiementsAdd: Paiement[] = [];
  paiementsRemove: Paiement[] = [];
  formPaiement: FormGroup;
  inscription: InscriptionDTO;
  datepipe = new DatePipe('en-US');
  max: number = (new Date()).getFullYear() + 1;
  min: number =(new Date()).getFullYear() - 1;
  customActionSheetOptions: any = {
    header: 'Sélectionner les cours à ajouter',
    cssClass: 'custom',
  };
  formCours: FormGroup;
  coursListe: Cours[] = [];

  constructor(private adherentService: AdherentService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder,
              private toastController: ToastController, private loadingController: LoadingController, private anneeService: AnneeService,
              private inscriptionService: InscriptionService, private loginService: LoginService,
              private coursService: CoursService, private paiementService: PaiementService, private modalController: ModalController) {
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
    this.formPaiement = this.formBuilder.group({
      payeurs: ['',  Validators.compose([ Validators.maxLength(100), Validators.required])],
      montant: ['',  Validators.compose([  Validators.required, Validators.min(0)])],
      banque: ['',  Validators.compose([ Validators.maxLength(300), Validators.required])],
      dateEncaissement: ['',  Validators.compose([ Validators.required])],
      numeroCheque: ['',  Validators.compose([ Validators.maxLength(200), Validators.required])],
    });
    this.formCours = this.formBuilder.group({
      cours: ['',  Validators.required],
    });
    }

  ngOnInit() {
  }
  cancel() {
    this.update = false;
    this.formInscription.setValue({
      annee: this.inscription.annee,
      certificat: this.inscription.certificat == true,
      enveloppe: this.inscription.enveloppe == true,
      reglement: this.inscription.reglement == true,
      comite_entreprise: this.inscription.comite_entreprise == true,
      autorisation_parental: this.inscription.autorisation_parental == true,
      date_envoi_ce: this.inscription.date_envoi_ce,
      questionnaire_sante: this.inscription.questionnaire_sante,
      reglement_interieur: this.inscription.reglement_interieur == true,
      essai: this.inscription.essai == true,
      cart_mra: this.inscription.cart_mra == true,
      commentaire: this.inscription.commentaire });
  }
  addCours(){
    this.formCours.value.cours.forEach((id) => {
      this.coursListe.forEach((cours) => {
        if (cours.id === id){
          let include = false;
          this.cours.forEach(coursPresent => {
            if (this.coursEgals(cours, coursPresent)) {
              include = true;
            }
          });
          if (!include) {
            this.cours.push(cours);
            this.coursAdd.push(cours);
          }
        }
      });
    });
    this.formCours.reset();
  }
  addPaiement(){
    const paiement = new Paiement(null, this.formPaiement.value.payeurs, this.formPaiement.value.montant,
        this.formPaiement.value.banque, this.formPaiement.value.dateEncaissement, this.formPaiement.value.numeroCheque);
    this.paiements.push(paiement);
    this.paiementsAdd.push(paiement);
    this.formPaiement.reset();
  }
  coursEgals(cours: Cours, cours2: Cours){
   return cours.id === cours2.id && cours.typeCours.id === cours2.typeCours.id && cours.jour === cours2.jour && cours.heure_debut === cours2.heure_debut && cours.heure_fin === cours2.heure_fin;
  }
  cancelCour() {
    this.updateCours = false;
    this.coursAdd.forEach(cour => {
      this.cours.splice(this.cours.indexOf(cour), 1);
    });
    this.coursAdd = [];
    this.coursRemove.forEach(cour => {
      this.cours.push(cour);
    });
    this.coursRemove = [];
  }
  cancelPaiement() {
    this.updatePaiement = false;
    this.paiementsAdd.forEach(paiement => {
      this.paiements.splice(this.paiements.indexOf(paiement), 1);
    });
    this.paiementsAdd = [];
    this.getPaiement(this.inscription);
  }
  removeCour(courRemove) {
    this.cours.splice(this.cours.indexOf(courRemove), 1);
    let isNew = false;
    this.coursAdd.forEach(cour => {
      if (cour  === courRemove){
        isNew = true;
      }
    });
    if (this.coursAdd.includes(courRemove)) {
      this.coursAdd.splice(this.coursAdd.indexOf(courRemove));
    }
    if (!isNew){
      this.coursRemove.push(courRemove);
    }
  }
  removePaiement(paiementRemove) {
    this.paiements.splice(this.paiements.indexOf(paiementRemove), 1);
    let isNew = false;
    this.paiementsAdd.forEach(paiement => {
      if (paiement  === paiementRemove){
        isNew = true;
      }
    });
    this.paiementsAdd.splice(this.paiementsAdd.indexOf(paiementRemove));
    if (!isNew){
      this.paiementsRemove.push(paiementRemove);
    }
  }
  async validate() {
    const loading = await this.loadingController.create({
      message: 'Sauvegarde en cours...',
    });
    loading.present();
    const inscriptionUpdate = new InscriptionDTO(this.inscription.id, this.inscription.idAdherent, this.formInscription.value.annee, this.formInscription.value.certificat, this.formInscription.value.enveloppe,
        this.formInscription.value.reglement, this.formInscription.value.comite_entreprise, this.formInscription.value.autorisation_parental, this.formInscription.value.commentaire,
        0, this.formInscription.value.questionnaire_sante, this.formInscription.value.date_envoi_ce, this.formInscription.value.reglement_interieur, this.formInscription.value.essai, this.formInscription.value.cart_mra);
    const command = UpdateInscriptionCommand.init(this.adherent.id, inscriptionUpdate);
    this.inscriptionService.update(this.inscription.id, command).subscribe(
        () => {
          loading.dismiss();
          this.presentToast('Inscription mise à jour', 'success');
          this.inscription = inscriptionUpdate;
          this.update = false;
        }
        , (error) => {
          this.presentToast(error ? error.error.error : 'Erreur lors de la mise à jour de l\'inscription', 'danger');
          loading.dismiss();
          this.cancel();
        }
    );
  }
  async validateCours() {
    const loading = await this.loadingController.create({
      message: 'Sauvegarde en cours...',
    });
    loading.present();
    let coursId = [];
    this.coursAdd.forEach(cour => {
      coursId.push(cour.id);
    });
    if (this.coursAdd.length > 0) {
      this.inscriptionService.addCours(this.inscription.id, new AddCoursInscriptionCommand(coursId, this.inscription.id)).subscribe(
          () => {
            loading.dismiss();
            this.presentToast('Inscription mise à jour', 'success');
            this.coursAdd = [];
            this.updateCours = false;
          }
          , (error) => {
            this.presentToast(error.error.error ? error.error.error : 'Erreur lors de la mise à jour de l\'inscription', 'danger');
            loading.dismiss();
            this.coursAdd.forEach(cour => {
              this.cours.splice(this.cours.indexOf(cour), 1);
            });
            this.coursAdd = [];
            this.updateCours = false;
          }
      );
    }
    coursId = [];
    this.coursRemove.forEach(cour => {
      coursId.push(cour.id);
    });
    if (this.coursRemove.length > 0) {
      this.inscriptionService.removeCours(this.inscription.id, new AddCoursInscriptionCommand(coursId, this.inscription.id)).subscribe(
          () => {
            loading.dismiss();
            this.presentToast('Inscription mise à jour', 'success');
            this.coursRemove = [];
            this.updateCours = false;
          }
          , (error) => {
            this.presentToast(error.error.error ? error.error.error : 'Erreur lors de la mise à jour de l\'inscription', 'danger');
            loading.dismiss();
            this.coursRemove.forEach(cour => {
              this.cours.push(cour);
            });
            this.coursRemove = [];
            this.updateCours = false;
          }
      );
    }
  }
  async validatePaiement() {
    const loading = await this.loadingController.create({
      message: 'Sauvegarde en cours...',
    });
    loading.present();
    this.inscriptionService.updatePaiement(this.inscription.id, new UpdatePaiementInscriptionCommand(this.paiements, this.inscription.id, this.inscription.annee)).subscribe(
        () => {
          loading.dismiss();
          this.presentToast('Inscription mise à jour', 'success');
          this.paiementsAdd = [];
          this.updatePaiement = false;
        }
        , (error) => {
          this.presentToast(error.error.error ? error.error.error : 'Erreur lors de la mise à jour de l\'inscription', 'danger');
          loading.dismiss();
          this.cancelPaiement();
        }
    );
  }
  canUpdate() {
    return this.loginService.haveDroit('upi');
  }
  changeMode() {
    if (this.update) {
      this.cancel();
    } else {
      this.update = true;
    }
  }
  changeModeCours() {
    if (this.updateCours) {
      this.cancelCour();
    } else {
      this.updateCours = true;
    }
  }
  changeModePaiement() {
    if (this.updatePaiement) {
      this.cancelPaiement();
    } else {
      this.updatePaiement = true;
    }
  }
  getCours(inscription: InscriptionDTO) {
    this.coursService.getByInscription(inscription.id).subscribe(
        cours => {
          this.cours = cours;
        }
    );
  }

  getPaiement(inscription: InscriptionDTO) {
    this.paiementService.getByIdInscription(inscription.id).subscribe(
        paiements => {
          this.paiements = paiements;
        }
    );
  }
  onSelect(event) {
    if(event.detail.value === 'Positif'){
      document.getElementById('certificatM').style.display = 'block';
    } else {
      document.getElementById('certificatM').style.display = 'none';
    }
  }
  async ionViewWillEnter() {
    const loading = await this.loadingController.create({
      message: 'chargement en cours...',
    });
    loading.present();

    this.coursService.getAll().subscribe(cours => {
      this.coursListe = cours;
    });
    this.route.queryParams.subscribe(params => {
      this.adherentService.getById(params.id)
          .subscribe(adherent => {
            this.adherent = adherent;
          });
      this.inscriptionService.getByAdherentAndAnnee(params.id, params.annee).subscribe(inscription => {
        this.inscription = inscription;
        this.formInscription.setValue({
          annee: params.annee,
          certificat: inscription.certificat == true,
          enveloppe: inscription.enveloppe == true,
          reglement: inscription.reglement == true,
          comite_entreprise: inscription.comite_entreprise == true,
          autorisation_parental: inscription.autorisation_parental == true,
          date_envoi_ce: inscription.date_envoi_ce,
          questionnaire_sante: inscription.questionnaire_sante,
          reglement_interieur: inscription.reglement_interieur == true,
          essai: inscription.essai == true,
          cart_mra: inscription.cart_mra == true,
          commentaire: inscription.commentaire });
        this.getPaiement(inscription);
        this.coursService.getByInscription(inscription.id).subscribe(
            cours => {
              this.cours = cours;
              this.loadingController.dismiss();
            }
        );
      });
    });
  }

  async presentToast(message, color) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
    });
    toast.present();
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
        this.paiementsAdd.push(paiement);
      }
    });
    return await modal.present();
  }


}
