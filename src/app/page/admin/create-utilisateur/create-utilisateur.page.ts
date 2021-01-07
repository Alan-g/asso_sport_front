import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../../../service/admin.service';
import {Role} from '../../../class/Role';
import {CreateUserCommand} from '../../../class/command/CreateUserCommand';
import {LoadingController, ToastController} from '@ionic/angular';
import {User} from '../../../class/User';

@Component({
  selector: 'app-create-utilisateur',
  templateUrl: './create-utilisateur.page.html',
  styleUrls: ['./create-utilisateur.page.scss'],
})
export class CreateUtilisateurPage implements OnInit {

  formUser: FormGroup;
  roles: Role[] = [];
  utilisateur: User;
  constructor(private router: Router, private formBuilder: FormBuilder, private  adminService: AdminService, private loadingController: LoadingController, private toastController: ToastController) {
    this.adminService.getAllRole().subscribe( (rolesRetrieve) => {
      this.roles = rolesRetrieve;
    });
    this.formUser = this.formBuilder.group({
      username: ['',  Validators.compose([ Validators.maxLength(100), Validators.required])],
      role: ['',  Validators.compose([  Validators.required])],
    });
    }

  ngOnInit() {
  }

  add() {
    document.getElementById('creation').style.display = 'block';
    this.utilisateur = null;
  }
  async validate(){
    const loading = await this.loadingController.create({
      message: 'Creation en cours...',
    });
    await loading.present();
    const password = this.password();
    const command = new CreateUserCommand(this.formUser.value.role, this.formUser.value.username, password);
    let role = null;
    this.roles.forEach((roleF) => {
      if (roleF.id === this.formUser.value.role) {
        role = roleF;
      }
    });
    this.adminService.createUser(command).subscribe( () => {
      this.utilisateur = new User(null, role, this.formUser.value.username, password); this.formUser.reset();
      loading.dismiss();
      document.getElementById('creation').style.display = 'none';
      this.presentToast('Utilisateur créé avec succès', 'success');
    }, (error) => {
      loading.dismiss(); this.presentToast(error.error.error === undefined ? 'une erreur est survenue. veuillez réessayer plus tard' : error.error.error, 'danger');
    });

  }

  password(){
    const pwdChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const pwdLen = 10;
    const randPassword = Array(pwdLen).fill(pwdChars).map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');
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
}
