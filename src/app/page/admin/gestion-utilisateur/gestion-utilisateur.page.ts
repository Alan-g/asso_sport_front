import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../service/admin.service';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';
import {User} from '../../../class/User';
import {Router} from '@angular/router';

@Component({
  selector: 'app-gestion-utilisateur',
  templateUrl: './gestion-utilisateur.page.html',
  styleUrls: ['./gestion-utilisateur.page.scss'],
})
export class GestionUtilisateurPage implements OnInit {

  users: User[] = [];
  userId = null;
  constructor(private adminService: AdminService, private toastController: ToastController, private loadingController: LoadingController, private router: Router, private alertController: AlertController) {
  }

  async delete(){
    const loading = await this.loadingController.create({
      message: 'Suppression en cours...',
    });
    const alert = await this.alertController.create({
      header: 'Suppression utilisateur',
      message: 'Êtes-vous sûr de vouloir supprimer le compte de cet utilisateur ?',
      buttons: [
        {
          text: 'oui',
          handler: () => {
            alert.dismiss();
            loading.present();
            this.adminService.deleteUser(this.userId).subscribe( () => {
              let userDelete = null;
              this.users.forEach((user) => {
                if (user.id === this.userId) {
                  userDelete = user;
                }
              });
              this.users.splice(this.users.indexOf(userDelete), 1);
              this.userId = null;
              this.presentToast('Utilisateur supprimé avec succès', 'success');
              loading.dismiss();
            }, () => {
              this.presentToast('Erreur lors de la suppression de l\'Utilisateur', 'danger');
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
    await alert.present();
  }

  update() {
    this.router.navigate(['/admin/utilisateur/gestion', this.userId]);
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    const loading = await this.loadingController.create({
      message: 'chargement en cours...',
    });
    loading.present();

    this.userId = null;
    this.adminService.getAllUser().subscribe( (users) => {
      this.users = users;
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
