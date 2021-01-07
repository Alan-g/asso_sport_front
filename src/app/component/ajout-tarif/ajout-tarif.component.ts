import { Component, OnInit } from '@angular/core';
import {CreateRoleCommand} from '../../class/command/CreateRoleCommand';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoadingController, ModalController, ToastController} from '@ionic/angular';
import {AdminService} from '../../service/admin.service';
import {CoursService} from '../../service/cours.service';
import {CreateMontantCommand} from '../../class/command/CreateMontantCommand';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-ajout-tarif',
  templateUrl: './ajout-tarif.component.html',
  styleUrls: ['./ajout-tarif.component.scss'],
})
export class AjoutTarifComponent implements OnInit {

  formTarif: FormGroup;
  nombre = 0;
  constructor(private modalController: ModalController,
              private route: ActivatedRoute,
              private coursService: CoursService,
              private formBuilder: FormBuilder,
              private loadingController: LoadingController,
              private toastController: ToastController) {
    this.formTarif = this.formBuilder.group({
      montant: ['',  Validators.compose([ Validators.min(0), Validators.required])],
    });
    this.route.queryParams.subscribe(params => {
      this.nombre = params.nombre;
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
    this.coursService.addMontant(new CreateMontantCommand(this.nombre, this.formTarif.value.montant)).subscribe(() => {
      loading.dismiss();
      this.presentToast('Tarif ajouté avec succès', 'success');
      this.modalController.dismiss();
    }, error => {
      loading.dismiss();
      this.presentToast('Erreur le tarif n\'a pas pu être créé', 'danger');
    });

  }p

  async presentToast(message, color) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
    });
    toast.present();
  }
}
