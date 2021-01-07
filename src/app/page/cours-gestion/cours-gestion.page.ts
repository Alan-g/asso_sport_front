import { Component, OnInit } from '@angular/core';
import {Prof} from '../../class/Prof';
import {ProfService} from '../../service/prof.service';
import {AlertController, LoadingController, ModalController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {CreateProfComponent} from '../../component/create-prof/create-prof.component';
import {CoursService} from '../../service/cours.service';
import {Cours} from '../../class/Cours';
import {CreateCoursComponent} from '../../component/create-cours/create-cours.component';

@Component({
  selector: 'app-cours-gestion',
  templateUrl: './cours-gestion.page.html',
  styleUrls: ['./cours-gestion.page.scss'],
})
export class CoursGestionPage implements OnInit {

  coursId: number;
  cours: Cours[];
  constructor( private coursService: CoursService, private toastController: ToastController,
               private loadingController: LoadingController, private router: Router, private alertController: AlertController,
               private modalController: ModalController) { }

  ngOnInit() {
  }
  async delete(){
    const loading = await this.loadingController.create({
      message: 'Suppression en cours...',
    });
    loading.present();
    const alert = await this.alertController.create({
      header: 'Suppression cours',
      message: 'Êtes-vous sûr de vouloir supprimer ce cours ?',
      buttons: [
        {
          text: 'oui',
          handler: () => {
            alert.dismiss();
            loading.present();
            this.coursService.delete(this.coursId).subscribe( () => {
              let courDelete = null;
              this.cours.forEach((cour) => {
                if (cour.id === this.coursId) {
                  courDelete = cour;
                }
              });
              this.cours.splice(this.cours.indexOf(courDelete), 1);
              this.coursId= null;
              this.presentToast('Cours supprimé avec succès', 'success');
              loading.dismiss();
            }, () => {
              this.presentToast('Erreur lors de la suppression du cours', 'danger');
              loading.dismiss();
            });
          }},
        {
          text: 'non',
          handler: () => {
            alert.dismiss();
          }}
      ]
    });
    const alertEchec = await this.alertController.create({
      header: 'Suppression cours',
      message: 'Impossible de supprimer un cours qui possède des adhérents',
      buttons: [
        {
          text: 'ok',
          handler: () => {
            alert.dismiss();
          }}
      ]
    });
    this.coursService.getAdherent(this.coursId).subscribe( adherents => {
      loading.dismiss();
      if  (adherents.length > 0 ){
        alertEchec.present();
      }  else {
        alert.present();
      }
    });
  }

  async update() {
    const modal = await this.modalController.create({
      component: CreateCoursComponent,
      componentProps: {
        id: this.coursId
      }
    });
    modal.onDidDismiss().then((data) => {
      this.coursService.getAll().subscribe(cours => {
        this.cours = cours;
        this.coursId = null;
      });
    });
    return await modal.present();
  }

  async create() {
    const modal = await this.modalController.create({
      component: CreateCoursComponent,
    });
    modal.onDidDismiss().then((data) => {
      this.coursService.getAll().subscribe(cours => {
        this.cours = cours;
        this.coursId = null;
      });
    });
    return await modal.present();
  }

  async ionViewWillEnter() {
    const loading = await this.loadingController.create({
      message: 'chargement en cours...',
    });
    loading.present();

    this.coursId = null;
    this.coursService.getAll().subscribe( (cours) => {
      this.cours = cours;
      loading.dismiss();
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

}
