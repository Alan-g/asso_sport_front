import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoadingController, ModalController, NavParams, ToastController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {SalleService} from '../../service/salle.service';
import {CreateSalleCommand} from '../../class/command/CreateSalleCommand';

@Component({
  selector: 'app-salle',
  templateUrl: './salle.component.html',
  styleUrls: ['./salle.component.scss'],
})
export class SalleComponent implements OnInit {

  salleId = null;
  formSalle: FormGroup;

  constructor(private modalController: ModalController,
              private route: ActivatedRoute,
              private salleService: SalleService,
              private formBuilder: FormBuilder,
              private loadingController: LoadingController,
              private toastController: ToastController,
              public navParams: NavParams) {
    this.formSalle = this.formBuilder.group({
      libelle: ['',  Validators.compose([  Validators.required])],
      capacite: ['',  Validators.compose([  Validators.required, Validators.min(0)])],
    });
    this.salleId = this.navParams.get('id');
    if (this.salleId) {
      this.salleService.getById(this.salleId).subscribe(type => {
        this.formSalle.setValue({libelle: type.libelle, capacite: type.capacite});
      });
    }
  }

  ngOnInit() {
  }
  close(){
    this.modalController.dismiss();
  }
  async validate(){
    if (!this.salleId) {
      const loading = await this.loadingController.create({
        message: 'Ajout en cours...',
      });
      loading.present();
      this.salleService.create(new CreateSalleCommand(this.formSalle.value.libelle, this.formSalle.value.capacite)).subscribe(() => {
        loading.dismiss();
        this.presentToast('Salle ajouté avec succès', 'success');
        this.modalController.dismiss();
      }, error => {
        loading.dismiss();
        this.presentToast('Erreur la salle n\'a pas pu être créé', 'danger');
      });
    } else {
      const loading = await this.loadingController.create({
        message: 'Mise à jour en cours...',
      });
      loading.present();
      this.salleService.update(this.salleId, new CreateSalleCommand(this.formSalle.value.libelle, this.formSalle.value.capacite)).subscribe(() => {
        loading.dismiss();
        this.presentToast('Salle mise à jour avec succès', 'success');
        this.modalController.dismiss();
      }, error => {
        loading.dismiss();
        this.presentToast(error.error.error ? error.error.error : 'Erreur lor de la mise à jour de la salle', 'danger');
      });
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
