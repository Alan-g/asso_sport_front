import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../service/admin.service';
import {Droit} from '../../../class/Droit';
import {Role} from '../../../class/Role';
import {AddRemoveDroitCommand} from '../../../class/command/AddRemoveDroitCommand';
import {LoadingController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-gestion-droit',
  templateUrl: './gestion-droit.page.html',
  styleUrls: ['./gestion-droit.page.scss'],
})
export class GestionDroitPage implements OnInit {

  droitRoles: {idDroit: number, roleId: Role[]}[] = [];
  droits: Droit[] = [];
  roles: Role[] = [];
  loadingGoal = -1;
  load = 0;

  constructor(private adminService: AdminService, private toastController: ToastController, private loadingController: LoadingController) {
  }

  async ionViewWillEnter() {
    const loading = await this.loadingController.create({
      message: 'chargement en cours...',
    });
    loading.present();

    this.adminService.getAllDroit().subscribe(droits => {
      this.droits = droits;
      this.loadingGoal = droits.length;
      this.droits.forEach((droit) => {
        this.adminService.getRoleByDroit(droit.id).subscribe((roles) => {
          this.load += 1;
          this.droitRoles.push({idDroit: droit.id, roleId: roles});
          if (this.loadingGoal === this.load){
            loading.dismiss();
          }
        });
      });
    });
    this.adminService.getAllRole().subscribe(role => {
      this.roles = role;
    });
  }

  ngOnInit() {
  }

  haveDroit(role: Role, idDroit: number){
    let reponse = false;
    this.droitRoles.forEach( (droitRole) => {
      if (droitRole.idDroit === idDroit){
        droitRole.roleId.forEach((roleFor) => {
          if (roleFor.id === role.id){
            reponse = true;
          }
        });
      }
    });
    return reponse;
  }

  updateDroit(event, idRole: number, idDroit: number){
    if (event.detail.checked) {
      this.adminService.addDroit(idRole, new AddRemoveDroitCommand(idDroit))
          .subscribe( () => {this.presentToast('Droit ajouté avec succès', 'success'); },
              () => () => {this.presentToast('Erreur lors de l\'ajout du droit, réessayer ultérieurement ', 'danger'); event.preventDefault(); });
    } else {
      this.adminService.deleteDroit(idRole, new AddRemoveDroitCommand(idDroit))
          .subscribe( () => {this.presentToast('Droit supprimer avec succès', 'success'); },
              () => () => {this.presentToast('Erreur lors de la suppression du droit, réessayer ultérieurement ', 'danger'); event.preventDefault(); });
    }
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
