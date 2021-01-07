import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../service/login.service';
import {LoadingController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  formLogin: FormGroup;
  passwordType = 'password';

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private loadingController: LoadingController,
              private router: Router, private toastController: ToastController) {
    if (this.loginService.getToken()) {
      if (!this.loginService.tokenExpire()){
        this.router.navigate(['/menu']);
      }
    }
    this.formLogin = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      motdepasse: ['', Validators.required]
    });
  }

  async login() {
    const loading = await this.loadingController.create({
      message: 'Veuillez patienter...',
    });
    await loading.present();

    this.loginService.login(this.formLogin.value.email, this.formLogin.value.motdepasse)
        .subscribe( x => {this.formLogin.reset(); loading.dismiss();  this.loginService.addToken(x);this.router.navigate(['/menu']); },
            x => {this.formLogin.get('motdepasse').reset(); loading.dismiss(); this.presentToast(x.error.error === undefined ? 'une erreur est survenue. veuillez réessayer plus tard' : x.error.error); });
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color: 'danger',
    });
    toast.present();
  }

}
