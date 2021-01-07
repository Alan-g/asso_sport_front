import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../service/admin.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {User} from '../../../class/User';
import {Role} from '../../../class/Role';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';
import {UpdateUserCommand} from '../../../class/command/UpdateUserCommand';

@Component({
  selector: 'app-modif-utilisateur',
  templateUrl: './modif-utilisateur.page.html',
  styleUrls: ['./modif-utilisateur.page.scss'],
})
export class ModifUtilisateurPage implements OnInit {
  user: User = null;
  roles: Role[] = [];
  formUser: FormGroup;

  constructor(private adminService: AdminService, private route: ActivatedRoute, private formBuilder: FormBuilder, private loadingController: LoadingController,
              private router: Router, private toastController: ToastController, private alertController: AlertController) {
    this.formUser = this.formBuilder.group({
      username: ['', Validators.compose([Validators.maxLength(100), Validators.required])],
      role: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
  }

  async save() {
    const loading = await this.loadingController.create({
      message: 'Sauvegarde en cours...',
    });
    await loading.present();
    this.adminService.updateUser(this.user.id, new UpdateUserCommand(this.formUser.value.role, this.formUser.value.username)).subscribe(() => {
      this.presentToast('Modification sauvegardée', 'success');
      loading.dismiss();
      this.router.navigate(['/admin/utilisateur/gestion']);
    }, () => {
      this.presentToast('Erreur lors de la sauvegarde des modifications', 'danger');
      loading.dismiss();
    });
  }

  async resetPassword() {

    const loading = await this.loadingController.create({
      message: 'Reset du mot de passe en cours...',
    });
    await loading.present();
    const password = this.password();
    this.adminService.resetPasswordUser(this.user.id, password).subscribe(() => {
      this.presentToast('Action effectuée avec succès', 'success');
      loading.dismiss();
      this.initAlert(password);
    }, () => {
      this.presentToast('Le password n\'a pas pu être réinitialisé', 'danger');
      loading.dismiss();
    });
  }

  async initAlert(password) {
    const alert = await this.alertController.create({
      header: 'Nouveau mot de passe',
      message: 'Voici le nouveau mot de passe : <strong>' + password + '<strong>',
      buttons: [
        {
          text: 'ok',
          handler: () => {
            alert.dismiss();
            this.router.navigate(['/admin/utilisateur/gestion']);
          }
        }
      ]
    });
    await alert.present();
  }

  modif() {
    if (!this.user) {
      return true;
    }
    return this.user.role.id === this.formUser.value.role && this.user.username === this.formUser.value.username;
  }

  password() {
    const pwdChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const pwdLen = 10;
    const randPassword = Array(pwdLen).fill(pwdChars).map(function(x) {
      return x[Math.floor(Math.random() * x.length)]
    }).join('');
    return randPassword;
  }

  async presentToast(message, color) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
    });
    toast.present();
  }

  ionViewWillEnter() {
    let params = this.route.snapshot.params;
    this.adminService.getAllRole().subscribe(roles => {
      this.roles = roles;
    });
    this.adminService.getUserById(params.idUser).subscribe(user => {
      this.user = user;
      this.formUser.setValue({username: this.user.username, role: this.user.role.id});
    });
  }
}
