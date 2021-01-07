import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoadingController, ModalController, NavParams, ToastController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {TypeCoursServiceService} from '../../service/type-cours-service.service';
import {CreateTypeCoursCommand} from '../../class/command/CreateTypeCoursCommand';

@Component({
  selector: 'app-create-type-cours',
  templateUrl: './create-type-cours.component.html',
  styleUrls: ['./create-type-cours.component.scss'],
})
export class CreateTypeCoursComponent implements OnInit {

  typeCourId = null;
  formTypeCours: FormGroup;

  constructor(private modalController: ModalController,
              private route: ActivatedRoute,
              private typeCoursService: TypeCoursServiceService,
              private formBuilder: FormBuilder,
              private loadingController: LoadingController,
              private toastController: ToastController,
              public navParams: NavParams) {
    this.formTypeCours = this.formBuilder.group({
      libelle: ['',  Validators.compose([  Validators.required])],
    });
    this.typeCourId = this.navParams.get('id');
    if (this.typeCourId) {
      this.typeCoursService.getById(this.typeCourId).subscribe(type => {
        this.formTypeCours.setValue({libelle: type.libelle});
      });
    }
  }

  ngOnInit() {
  }
  close(){
    this.modalController.dismiss();
  }
  async validate(){
    if (!this.typeCourId) {
      const loading = await this.loadingController.create({
        message: 'Ajout en cours...',
      });
      loading.present();
      this.typeCoursService.create(new CreateTypeCoursCommand(this.formTypeCours.value.libelle)).subscribe(() => {
        loading.dismiss();
        this.presentToast('Type Cours ajouté avec succès', 'success');
        this.modalController.dismiss();
      }, error => {
        loading.dismiss();
        this.presentToast('Erreur le type de cours n\'a pas pu être créé', 'danger');
      });
    } else {
      const loading = await this.loadingController.create({
        message: 'Mise à jour en cours...',
      });
      loading.present();
      this.typeCoursService.update(this.typeCourId, new CreateTypeCoursCommand(this.formTypeCours.value.libelle)).subscribe(() => {
        loading.dismiss();
        this.presentToast('Type de cours mise à jour avec succès', 'success');
        this.modalController.dismiss();
      }, error => {
        loading.dismiss();
        this.presentToast(error.error.error ? error.error.error : 'Erreur lor de la mise à jour du type de cours', 'danger');
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
