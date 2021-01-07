import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController, ModalController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {Salle} from '../../class/Salle';
import {SalleService} from '../../service/salle.service';
import {SalleComponent} from '../../component/salle/salle.component';

@Component({
  selector: 'app-gestion-salle',
  templateUrl: './gestion-salle.page.html',
  styleUrls: ['./gestion-salle.page.scss'],
})
export class GestionSallePage implements OnInit {

  salleId: number;
  salles: Salle[];
  constructor( private salleService: SalleService, private toastController: ToastController,
               private loadingController: LoadingController, private router: Router, private alertController: AlertController,
               private modalController: ModalController) { }

  ngOnInit() {
  }
  async delete(){
    const loading = await this.loadingController.create({
      message: 'Suppression en cours...',
    });
    const alert = await this.alertController.create({
      header: 'Suppression d\'une salle',
      message: 'Êtes-vous sûr de vouloir supprimer cette salle ?',
      buttons: [
        {
          text: 'oui',
          handler: () => {
            alert.dismiss();
            loading.present();
            this.salleService.delete(this.salleId).subscribe( () => {
              let salleDelete = null;
              this.salles.forEach((salle) => {
                if (salle.id === this.salleId) {
                  salleDelete = salle;
                }
              });
              this.salles.splice(this.salles.indexOf(salleDelete), 1);
              this.salleId = null;
              this.presentToast('Salle supprimé avec succès', 'success');
              loading.dismiss();
            }, () => {
              this.presentToast('Erreur lors de la suppression de la salle', 'danger');
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
    alert.present();
  }

  async update() {
    const modal = await this.modalController.create({
      component: SalleComponent,
      componentProps: {
        id: this.salleId
      }
    });
    modal.onDidDismiss().then((data) => {
      this.salleService.getAll().subscribe(salles => {
        this.salles = salles;
        this.salleId = null;
      });
    });
    return await modal.present();
  }

  async create() {
    const modal = await this.modalController.create({
      component: SalleComponent,
    });
    modal.onDidDismiss().then((data) => {
      this.salleService.getAll().subscribe(salles => {
        this.salles = salles;
        this.salleId = null;
      });
    });
    return await modal.present();
  }
  async ionViewWillEnter() {
    const loading = await this.loadingController.create({
      message: 'chargement en cours...',
    });
    loading.present();

    this.salleId = null;
    this.salleService.getAll().subscribe( (salles) => {
      this.salles = salles;
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
