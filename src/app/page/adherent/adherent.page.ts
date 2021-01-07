import {Component, OnInit} from '@angular/core';
import {AdherentService} from '../../service/adherent.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Adherent} from '../../class/Adherent';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoadingController, ToastController} from '@ionic/angular';
import {UpdateAdherentCommand} from '../../class/command/UpdateAdherentCommand';
import {Annee} from '../../class/Annee';
import {AnneeService} from '../../service/annee.service';
import {InscriptionDTO} from '../../class/InscriptionDTO';
import {InscriptionService} from '../../service/inscription.service';
import {LoginService} from '../../service/login.service';
import {DatePipe} from '@angular/common';
import {CoursService} from '../../service/cours.service';
import {PaiementService} from '../../service/paiement.service';
import {Cours} from '../../class/Cours';
import {Paiement} from '../../class/Paiement';


@Component({
    selector: 'app-adherent',
    templateUrl: './adherent.page.html',
    styleUrls: ['./adherent.page.scss'],
})
export class AdherentPage implements OnInit {

    formAdherent: FormGroup;
    adherent: Adherent;
    update = false;
    annees: Annee[] = [];
    cours: Cours[] = [];
    paiements: Paiement[] = [];
    anneeSelect = null;
    inscriptions: InscriptionDTO[] = [];
    datepipe = new DatePipe('en-US');

    constructor(private adherentService: AdherentService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder,
                private toastController: ToastController, private loadingController: LoadingController, private anneeService: AnneeService,
                private inscriptionService: InscriptionService, private loginService: LoginService,
                private coursService: CoursService, private paiementService: PaiementService) {
      this.formAdherent = this.formBuilder.group({
            genre: ['', Validators.required],
            nom: ['', Validators.compose([Validators.maxLength(100), Validators.required])],
            prenom: ['', Validators.compose([Validators.maxLength(100), Validators.required])],
            adresse1: ['', Validators.compose([Validators.maxLength(300)])],
            adresse2: ['', Validators.compose([Validators.maxLength(300)])],
            adresse3: ['', Validators.compose([Validators.maxLength(300)])],
            codePostal: ['', Validators.compose([Validators.maxLength(5), Validators.minLength(5), Validators.required])],
            commune: ['', Validators.compose([Validators.maxLength(300), Validators.required])],
            telephone: ['', Validators.compose([Validators.maxLength(20), Validators.minLength(10)])],
            mail: ['', Validators.compose([Validators.email])],
            dateNaissance: ['',],
        });
    }

    async validate() {
        const loading = await this.loadingController.create({
            message: 'Sauvegarde en cours...',
        });
        loading.present();
        const adherentUpdate = new Adherent(this.adherent.id, this.formAdherent.value.genre, this.formAdherent.value.nom,
            this.formAdherent.value.prenom, this.formAdherent.value.adresse1, this.formAdherent.value.adresse2,
            this.formAdherent.value.adresse3, this.formAdherent.value.codePostal, this.formAdherent.value.commune,
            this.formAdherent.value.telephone, this.formAdherent.value.mail, this.formAdherent.value.dateNaissance);
        this.adherentService.update(this.adherent.id, UpdateAdherentCommand.init(adherentUpdate)).subscribe(
            () => {
                loading.dismiss();
                this.presentToast('Adherent mise à jour', 'success');
                this.adherent = adherentUpdate;
                this.update = false;
            }
            , (error) => {
                this.presentToast(error ? error.error.error : 'Erreur lors de la mise à jour de l\'adherent', 'danger');
                loading.dismiss();
                this.cancel();
            }
        );
    }

    canUpdate() {
        return this.loginService.haveDroit('upa');
    }

    cancel() {
        this.update = false;
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
    }

    changeMode() {
        if (this.update) {
            this.cancel();
        } else {
            this.update = true;
        }
    }
    onChange(){
        this.cours = [];
        this.paiements = [];
        this.inscriptions.forEach(inscription => {
            if (inscription.annee === this.anneeSelect){
                this.getCours(inscription);
                this.getPaiement(inscription);
            }
        });
    }
    haveInscription(){
        let have = false;
        this.inscriptions.forEach(inscription => {
            if (inscription.annee === this.anneeSelect){
                have = true;
            }
        });
        return have;
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

    async ionViewWillEnter() {
        const loading = await this.loadingController.create({
            message: 'chargement en cours...',
        });
        loading.present();

        this.route.queryParams.subscribe(params => {
            this.adherentService.getById(params.id)
                .subscribe(adherent => {
                    this.adherent = adherent;
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
                });
            this.inscriptionService.getByAdherent(params.id).subscribe(inscriptions => {
                this.inscriptions = inscriptions;
                inscriptions.forEach(inscription => {
                    if (inscription.annee === this.anneeSelect){
                        this.getCours(inscription);
                        this.getPaiement(inscription);
                    }
                });
                loading.dismiss();
            });
        });
        this.anneeService.getAll().subscribe(annees => {
            this.annees = annees;
            this.annees.forEach(annee => {
                if (annee.actif) {
                    this.anneeSelect = annee.libelle;
                }
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

    ngOnInit(): void {
    }

}
