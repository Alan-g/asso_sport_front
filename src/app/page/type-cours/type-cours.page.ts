import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController, ModalController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {TypeCours} from '../../class/TypeCours';
import {TypeCoursServiceService} from '../../service/type-cours-service.service';
import {CreateTypeCoursComponent} from '../../component/create-type-cours/create-type-cours.component';

@Component({
  selector: 'app-type-cours',
  templateUrl: './type-cours.page.html',
  styleUrls: ['./type-cours.page.scss'],
})
export class TypeCoursPage implements OnInit {

  typeCourId: number;
  typeCours: TypeCours[];
  constructor( private typeCoursService: TypeCoursServiceService, private toastController: ToastController,
               private loadingController: LoadingController, private router: Router, private alertController: AlertController,
               private modalController: ModalController) { }

  ngOnInit() {
  }
  async delete(){
    const loading = await this.loadingController.create({
      message: 'Suppression en cours...',
    });
    const alert = await this.alertController.create({
      header: 'Suppression du type de cours',
      message: 'Êtes-vous sûr de vouloir supprimer ce type de cours ?',
      buttons: [
        {
          text: 'oui',
          handler: () => {
            alert.dismiss();
            loading.present();
            this.typeCoursService.delete(this.typeCourId).subscribe( () => {
              let typeDelete = null;
              this.typeCours.forEach((type) => {
                if (type.id === this.typeCourId) {
                  typeDelete = type;
                }
              });
              this.typeCours.splice(this.typeCours.indexOf(typeDelete), 1);
              this.typeCourId = null;
              this.presentToast('Type de cours supprimé avec succès', 'success');
              loading.dismiss();
            }, () => {
              this.presentToast('Erreur lors de la suppression du type de cours', 'danger');
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
      component: CreateTypeCoursComponent,
      componentProps: {
        id: this.typeCourId
      }
    });
    modal.onDidDismiss().then((data) => {
      this.typeCoursService.getAll().subscribe(typeCours => {
        this.typeCours = typeCours;
        this.typeCourId = null;
      });
    });
    return await modal.present();
  }

  async create() {
    const modal = await this.modalController.create({
      component: CreateTypeCoursComponent,
    });
    modal.onDidDismiss().then((data) => {
      this.typeCoursService.getAll().subscribe(typeCours => {
        this.typeCours = typeCours;
        this.typeCourId = null;
      });
    });
    return await modal.present();
  }
  async ionViewWillEnter() {
    const loading = await this.loadingController.create({
      message: 'chargement en cours...',
    });
    loading.present();

    this.typeCourId = null;
    this.typeCoursService.getAll().subscribe( (typeCours) => {
      this.typeCours = typeCours;
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
