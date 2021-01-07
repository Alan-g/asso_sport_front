import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../service/admin.service';
import {AlertController, LoadingController, ModalController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {Role} from '../../../class/Role';
import {SearchAdherentComponent} from '../../../component/search-adherent/search-adherent.component';
import {AddRoleComponent} from '../../../component/add-role/add-role.component';

@Component({
  selector: 'app-gestion-role',
  templateUrl: './gestion-role.page.html',
  styleUrls: ['./gestion-role.page.scss'],
})
export class GestionRolePage implements OnInit {

  roles: Role[] = [];
  constructor(private adminService: AdminService, private loadingController: LoadingController,
              private toastController: ToastController, private alertController: AlertController,
              private modalController: ModalController) { }

  ngOnInit() {
  }

  async delete(roleId){
    const loading = await this.loadingController.create({
      message: 'Suppression en cours...',
    });
    const alert = await this.alertController.create({
      header: 'Suppression rôle',
      message: 'Êtes-vous sûr de vouloir supprimer ce rôle ? <br>Attention le rôle ne pourra pas être supprimé si des joueurs sons encore attachés a ce dernier',
      buttons: [
        {
          text: 'oui',
          handler: () => {
            alert.dismiss();
            loading.present();
            this.adminService.deleteRole(roleId).subscribe( () => {
              let roleDelete = null;
              this.roles.forEach((role) => {
                if (role.id === roleId) {
                  roleDelete = role;
                }
              });
              this.roles.splice(this.roles.indexOf(roleDelete), 1);
              this.presentToast('Rôle supprimé avec succès', 'success');
              loading.dismiss();
            }, (error) => {
              this.presentToast(error ? error.error.error : 'Erreur lors de la suppression du Rôle', 'danger');
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

  async add() {
    const modal = await this.modalController.create({
      component: AddRoleComponent,
    });
    modal.onDidDismiss().then((data) => {
      this.adminService.getAllRole().subscribe(roles => {
        this.roles = roles;
      });
    });
    return await modal.present();
  }

  async ionViewWillEnter() {
    const loading = await this.loadingController.create({
      message: 'chargement en cours...',
    });
    loading.present();
    this.adminService.getAllRole().subscribe(roles => {
      this.roles = roles;
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
