import { Component, OnInit } from '@angular/core';
import {LoadingController, ModalController, ToastController} from '@ionic/angular';
import {CoursService} from '../../service/cours.service';
import {MontantCours} from '../../class/MontantCours';
import {UpdateMontantCommand} from '../../class/command/UpdateMontantCommand';
import {AddRoleComponent} from '../../component/add-role/add-role.component';
import {AjoutTarifComponent} from '../../component/ajout-tarif/ajout-tarif.component';

@Component({
  selector: 'app-montant-cour',
  templateUrl: './montant-cour.page.html',
  styleUrls: ['./montant-cour.page.scss'],
})
export class MontantCourPage implements OnInit {

  montantId = null;
  montantCours: MontantCours[] = [];
  constructor(private loadingController: LoadingController, private toastController: ToastController, private coursService: CoursService, private modalController: ModalController) {

  }

  ngOnInit() {
  }

  update(montantId: number, montant: number, event: CustomEvent) {
    // @ts-ignore
    if (event.currentTarget.children[0] === document.activeElement) {
      this.coursService.updateMontant(montantId, new UpdateMontantCommand(montant)).subscribe(() => {
        this.presentToast('Montant mise à jour', 'success');
      }, () => {
        this.presentToast('Erreur lors de la mise à jour', 'danger');
      });
    }
  }

  delete(){
    const montant = this.montantCours[this.montantCours.length - 1];
    this.coursService.deleteMontant(montant.id).subscribe( () => {
      this.presentToast('Suppression réussite', 'success');
      this.montantCours.splice(this.montantCours.indexOf(montant), 1);
    }, () => {
      this.presentToast('Erreur lors de la suppression', 'danger');
    });
  }

  async add(){
    const modal = await this.modalController.create({
      component: AjoutTarifComponent,
      componentProps: {
        nombre: (this.montantCours.length + 1)
      }
    });
    modal.onDidDismiss().then((data) => {
      this.coursService.getMontant().subscribe( montantCours => {
        this.montantCours = montantCours;
      });
    });
    return await modal.present();
  }
  async presentToast(message, color) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
    });
    toast.present();
  }

  async ionViewWillEnter() {
    const loading = await this.loadingController.create({
      message: 'chargement en cours...',
    });
    loading.present();

    this.montantId = null;
    this.coursService.getMontant().subscribe( montantCours => {
      this.montantCours = montantCours;
      loading.dismiss();
    });
  }
}
