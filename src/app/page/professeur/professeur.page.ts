import {Component, Input, OnInit} from '@angular/core';
import {AlertController, LoadingController, ModalController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {Prof} from '../../class/Prof';
import {ProfService} from '../../service/prof.service';
import {CreateProfComponent} from '../../component/create-prof/create-prof.component';

@Component({
  selector: 'app-professeur',
  templateUrl: './professeur.page.html',
  styleUrls: ['./professeur.page.scss'],
})
export class ProfesseurPage implements OnInit {

  profId: number;
  profs: Prof[];
  constructor( private profService: ProfService, private toastController: ToastController,
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
      header: 'Suppression professeur',
      message: 'Êtes-vous sûr de vouloir supprimer ce professeur ?',
      buttons: [
        {
          text: 'oui',
          handler: () => {
            alert.dismiss();
            loading.present();
            this.profService.delete(this.profId).subscribe( () => {
              let profDelete = null;
              this.profs.forEach((prof) => {
                if (prof.id === this.profId) {
                  profDelete = prof;
                }
              });
              this.profs.splice(this.profs.indexOf(profDelete), 1);
              this.profId = null;
              this.presentToast('Professeur supprimé avec succès', 'success');
              loading.dismiss();
            }, () => {
              this.presentToast('Erreur lors de la suppression du professeur', 'danger');
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
      header: 'Suppression professeur',
      message: 'Impossible de supprimer le professeur car il est lié à des cours',
      buttons: [
        {
          text: 'ok',
          handler: () => {
            alert.dismiss();
          }}
      ]
    });
    this.profService.getCours(this.profId).subscribe( cours => {
      loading.dismiss();
      if  (cours.length > 0 ){
        alertEchec.present();
      }  else {
        alert.present();
      }
    });
  }

  async update() {
    const modal = await this.modalController.create({
      component: CreateProfComponent,
      componentProps: {
        id: this.profId
      }
    });
    modal.onDidDismiss().then((data) => {
      this.profService.getAll().subscribe(profs => {
        this.profs = profs;
        this.profId = null;
      });
    });
    return await modal.present();
  }

  async create() {
    const modal = await this.modalController.create({
      component: CreateProfComponent,
    });
    modal.onDidDismiss().then((data) => {
      this.profService.getAll().subscribe(profs => {
        this.profs = profs;
        this.profId = null;
      });
    });
    return await modal.present();
  }
  async ionViewWillEnter() {
    const loading = await this.loadingController.create({
      message: 'chargement en cours...',
    });
    loading.present();

    this.profId = null;
    this.profService.getAll().subscribe( (profs) => {
      this.profs = profs;
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
