import {Component, Input, OnInit} from '@angular/core';
import {LoadingController, ModalController, NavParams, ToastController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {CoursService} from '../../service/cours.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProfService} from '../../service/prof.service';
import {CreateMontantCommand} from '../../class/command/CreateMontantCommand';
import {CreateProfCommand} from '../../class/command/CreateProfCommand';
import {UpdateProfCommand} from '../../class/command/UpdateProfCommand';

@Component({
  selector: 'app-create-prof',
  templateUrl: './create-prof.component.html',
  styleUrls: ['./create-prof.component.scss'],
})
export class CreateProfComponent implements OnInit {

  profId = null;
  formProfesseur: FormGroup;

  constructor(private modalController: ModalController,
              private route: ActivatedRoute,
              private profService: ProfService,
              private formBuilder: FormBuilder,
              private loadingController: LoadingController,
              private toastController: ToastController,
              public navParams : NavParams) {
    this.formProfesseur = this.formBuilder.group({
      nom: [''],
      prenom: ['',  Validators.compose([  Validators.required])],
      mail: ['',  Validators.compose([  Validators.email])],
      telephone: ['',  Validators.compose([  Validators.minLength(10)])],
    });
    this.profId = this.navParams.get('id');
    if (this.profId) {
        this.profService.getById(this.profId).subscribe(prof => {
          this.formProfesseur.setValue({nom: prof.nom, prenom: prof.prenom, mail: prof.mail, telephone: prof.telephone});
        });
      }
  }

  ngOnInit() {
  }
  close(){
    this.modalController.dismiss();
  }
  async validate(){
    if (!this.profId) {
      const loading = await this.loadingController.create({
        message: 'Ajout en cours...',
      });
      loading.present();
      this.profService.create(new CreateProfCommand(this.formProfesseur.value.nom, this.formProfesseur.value.prenom, this.formProfesseur.value.telephone, this.formProfesseur.value.mail)).subscribe(() => {
        loading.dismiss();
        this.presentToast('Professeur ajouté avec succès', 'success');
        this.modalController.dismiss();
      }, error => {
        loading.dismiss();
        this.presentToast('Erreur le professeur n\'a pas pu être créé', 'danger');
      });
    } else {
      const loading = await this.loadingController.create({
        message: 'Mise à jour en cours...',
      });
      loading.present();
      this.profService.update(this.profId, new UpdateProfCommand(this.profId,this.formProfesseur.value.nom, this.formProfesseur.value.prenom, this.formProfesseur.value.telephone, this.formProfesseur.value.mail)).subscribe(() => {
        loading.dismiss();
        this.presentToast('Professeur mise à jour avec succès', 'success');
        this.modalController.dismiss();
      }, error => {
        loading.dismiss();
        this.presentToast(error.error.error ? error.error.error : 'Erreur lor de la mise à jour du professeur', 'danger');
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
