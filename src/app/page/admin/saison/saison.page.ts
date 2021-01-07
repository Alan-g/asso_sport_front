import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../service/admin.service';
import {CoursService} from '../../../service/cours.service';
import {ProfService} from '../../../service/prof.service';
import {Prof} from '../../../class/Prof';
import {Cours} from '../../../class/Cours';
import {Annee} from '../../../class/Annee';
import {AnneeService} from '../../../service/annee.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoadingController, ToastController} from '@ionic/angular';
import {CreateSaisonCommand} from '../../../class/command/CreateSaisonCommand.ts';

@Component({
  selector: 'app-saison',
  templateUrl: './saison.page.html',
  styleUrls: ['./saison.page.scss'],
})
export class SaisonPage implements OnInit {
  customActionSheetOptions: any = {
    cssClass: 'custom',
  };
  profs: Prof[] = [];
  cours: Cours[] = [];
  annees: Annee[] = [];
  formSaison: FormGroup;
  constructor(private adminService: AdminService, private coursService: CoursService, private profService: ProfService, private anneeService: AnneeService,
              private formBuilder: FormBuilder,private loadingController: LoadingController,
              private toastController: ToastController) {
    this.formSaison = formBuilder.group({
      anneeDebut: ['',  Validators.compose([ Validators.min(0), Validators.required])],
      anneeFin: ['',  Validators.compose([ Validators.min(0), Validators.required])],
      profs: ['',  Validators.compose([])],
      cours: ['',  Validators.compose([])],
    });
  }

  async validate(){
    const loading = await this.loadingController.create({
      message: 'Création en cours...',
    });
    loading.present();
    this.adminService.createSaison(new CreateSaisonCommand(this.formSaison.value.anneeDebut + ' - ' + this.formSaison.value.anneeFin, this.formSaison.value.profs, this.formSaison.value.cours)).subscribe(
        () => {
      this.presentToast('Saison créée avec succès', 'success');
      loading.dismiss();
      this.formSaison.reset();
      this.anneeService.getAll().subscribe(annees => {
            this.annees = annees;
      });
    }, (error) => {
          this.presentToast(error.error.error === undefined ? 'une erreur est survenue. veuillez réessayer plus tard' : error.error.error, 'danger');
          loading.dismiss();
    });
  }

  async ionViewWillEnter() {
    const loading = await this.loadingController.create({
      message: 'chargement en cours...',
    });
    loading.present();
    this.profService.getAll().subscribe(profs => {
      this.profs = profs;
    });
    this.coursService.getAll().subscribe(cours => {
      this.cours = cours;
    });
    this.anneeService.getAll().subscribe(annees => {
      this.annees = annees;
      loading.dismiss();
    });
  }
    ngOnInit() {
  }

  async presentToast(message, color) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
    });
    toast.present();
  }
}
