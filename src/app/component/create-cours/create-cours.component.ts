import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoadingController, ModalController, NavParams, ToastController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {ProfService} from '../../service/prof.service';
import {CreateProfCommand} from '../../class/command/CreateProfCommand';
import {UpdateProfCommand} from '../../class/command/UpdateProfCommand';
import {CoursService} from '../../service/cours.service';
import {CreateCoursCommand} from '../../class/command/CreateCoursCommand';
import {UpdateCoursCommand} from '../../class/command/UpdateCoursCommand';
import {Prof} from '../../class/Prof';
import {TypeCours} from '../../class/TypeCours';
import {TypeCoursServiceService} from '../../service/type-cours-service.service';
import {SalleService} from '../../service/salle.service';
import {Salle} from '../../class/Salle';
import {isLineBreak} from 'codelyzer/angular/sourceMappingVisitor';

@Component({
    selector: 'app-create-cours',
    templateUrl: './create-cours.component.html',
    styleUrls: ['./create-cours.component.scss'],
})
export class CreateCoursComponent implements OnInit {
    customActionSheetOptions: any = {
        cssClass: 'custom',
    };
    coursId = null;
    formCours: FormGroup;
    professeur: Prof[];
    typeCours: TypeCours[];
    salles: Salle[];

    constructor(private modalController: ModalController,
                private route: ActivatedRoute,
                private coursService: CoursService,
                private profService: ProfService,
                private typeCoursService: TypeCoursServiceService,
                private salleService: SalleService,
                private formBuilder: FormBuilder,
                private loadingController: LoadingController,
                private toastController: ToastController,
                public navParams: NavParams) {
        this.profService.getAll().subscribe(profs => {
            this.professeur = profs;
            this.coursId = this.navParams.get('id');
            if (this.coursId) {
                this.coursService.getById(this.coursId).subscribe(cour => {
                    this.formCours.setValue({
                        typeCours: cour.typeCours.id, salle: cour.salle === null ? null : cour.salle.id, jour: cour.jour
                        , heureDebut: cour.heure_debut, heureFin: cour.heure_fin, limite: cour.limite, professeur: cour.prof.id
                    });
                });
            }
        });
        this.typeCoursService.getAll().subscribe(typeCours => {
            this.typeCours = typeCours;
        });

        this.salleService.getAll().subscribe(salles => {
            this.salles = salles;
        });
        this.formCours = this.formBuilder.group({
            typeCours: ['', Validators.compose([Validators.required])],
            salle: [''],
            jour: ['', Validators.compose([Validators.required])],
            heureDebut: ['', Validators.compose([Validators.required])],
            heureFin: ['', Validators.compose([Validators.required])],
            limite: ['', Validators.compose([Validators.required])],
            professeur: ['', Validators.compose([Validators.required])],
        });
    }

    ngOnInit() {
    }

    close() {
        this.modalController.dismiss();
    }

    async validate() {
        if (!this.coursId) {
            const loading = await this.loadingController.create({
                message: 'Ajout en cours...',
            });
            loading.present();
            this.coursService.create(new CreateCoursCommand(this.formCours.value.typeCours, this.formCours.value.salle, this.formCours.value.professeur, this.formCours.value.jour, this.formCours.value.heureDebut, this.formCours.value.heureFin, this.formCours.value.limite)).subscribe(() => {
                loading.dismiss();
                this.presentToast('Cours ajouté avec succès', 'success');
                this.modalController.dismiss();
            }, error => {
                loading.dismiss();
                this.presentToast('Erreur le cours n\'a pas pu être créé', 'danger');
            });
        } else {
            const loading = await this.loadingController.create({
                message: 'Mise à jour en cours...',
            });
            loading.present();
            this.coursService.update(this.coursId, new UpdateCoursCommand(this.coursId, this.formCours.value.typeCours, this.formCours.value.salle, this.formCours.value.professeur, this.formCours.value.jour, this.formCours.value.heureDebut, this.formCours.value.heureFin, this.formCours.value.limite)).subscribe(() => {
                loading.dismiss();
                this.presentToast('cours mise à jour avec succès', 'success');
                this.modalController.dismiss();
            }, error => {
                loading.dismiss();
                this.presentToast(error.error.error ? error.error.error : 'Erreur lor de la mise à jour du cours', 'danger');
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

    onSelectSalle(){
        this.salles.forEach(salle => {
            if (salle.id === this.formCours.value.salle){
                this.formCours.controls['limite'].setValue(salle.capacite);
                return;
            }
        });
    }

}
