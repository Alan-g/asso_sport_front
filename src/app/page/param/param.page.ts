import { Component, OnInit } from '@angular/core';
import {User} from '../../class/User';
import {UserService} from '../../service/user.service';
import {FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {LoadingController, ToastController} from '@ionic/angular';
import {CreateMontantCommand} from '../../class/command/CreateMontantCommand';
import {ChangePasswordCommand} from '../../class/command/ChangePasswordCommand';

@Component({
  selector: 'app-param',
  templateUrl: './param.page.html',
  styleUrls: ['./param.page.scss'],
})
export class ParamPage implements OnInit {

  account: User;
  formPassword: FormGroup = this.formBuilder.group({
    oldPassword: ['',  Validators.compose([ Validators.required])],
    newPassword: ['',  Validators.compose([ Validators.required, Validators.minLength(5)])],
    // @ts-ignore
    newPasswordCheck: ['',  Validators.compose([ Validators.required, this.comparePassword, Validators.minLength(5)])],
  });
  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private loadingController: LoadingController,
              private toastController: ToastController) {
    this.formPassword.setValidators(this.comparisonValidator());
  }

  public comparisonValidator(): ValidatorFn{
    return (group: FormGroup): ValidationErrors => {
      const control1 = group.controls['newPassword'];
      const control2 = group.controls['newPasswordCheck'];
      if (control1.value !== control2.value) {
        control2.setErrors({notEquivalent: true});
      } else {
        control2.setErrors(null);
      }
      return;
    };
  }


  ngOnInit() {
  }

  async ionViewWillEnter() {
    const loading = await this.loadingController.create({
      message: 'chargement en cours...',
    });
    loading.present();    this.userService.getOne().subscribe( user => {
      this.account = user;
      loading.dismiss();
    });
  }

  async validate(){
    const loading = await this.loadingController.create({
      message: 'Modification en cours...',
    });
    loading.present();
    this.userService.changePassword(new ChangePasswordCommand( this.formPassword.value.oldPassword, this.formPassword.value.newPassword)).subscribe(() => {
      loading.dismiss();
      this.presentToast('Mot de passe changé avec succès', 'success');
      this.formPassword.reset();

    }, error => {
      loading.dismiss();
      this.presentToast(error.error.error ? error.error.error : 'Erreur le Mot de passe n\'a pas pu être modifié', 'danger');
      this.formPassword.setValue({oldPassword: '', newPassword: this.formPassword.value.newPassword, newPasswordCheck: this.formPassword.value.newPasswordCheck});
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
