import { Component, OnInit } from '@angular/core';
import {LoadingController, ModalController, ToastController} from '@ionic/angular';
import {AdherentService} from '../../service/adherent.service';
import {AdminService} from '../../service/admin.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CreateRoleCommand} from '../../class/command/CreateRoleCommand';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss'],
})
export class AddRoleComponent implements OnInit {

  formRole: FormGroup;
  constructor(private modalController: ModalController,
              private adminService: AdminService,
              private formBuilder: FormBuilder,
              private loadingController: LoadingController,
              private toastController: ToastController) {
    this.formRole = this.formBuilder.group({
      libelle: ['',  Validators.compose([ Validators.maxLength(60), Validators.required])],
    });
  }

  ngOnInit() {}

  close(){
    this.modalController.dismiss();
  }

  async validate(){
    const loading = await this.loadingController.create({
      message: 'Ajout en cours...',
    });
    loading.present();
    this.adminService.createRole(new CreateRoleCommand(this.formRole.value.libelle)).subscribe(() => {
      loading.dismiss();
      this.presentToast('Rôle ajouté avec succès', 'success');
      this.modalController.dismiss();
    }, error => {
      loading.dismiss();
      this.presentToast('Erreur le rôle n\'a pas pu être créé', 'danger');
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
