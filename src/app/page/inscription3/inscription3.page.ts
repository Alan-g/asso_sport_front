import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationExtras, Route, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Cours} from '../../class/Cours';
import {CoursService} from '../../service/cours.service';
import {MontantCours} from '../../class/MontantCours';
import {InscriptionDTO} from '../../class/InscriptionDTO';

@Component({
  selector: 'app-inscription3',
  templateUrl: './inscription3.page.html',
  styleUrls: ['./inscription3.page.scss'],
})
export class Inscription3Page implements OnInit {
  customActionSheetOptions: any = {
    header: 'Sélectionner les cours à ajouter',
    cssClass: 'custom',
  };
  montant: number = 0;
  formCours: FormGroup;
  coursListe: Cours[] = [];
  coursSelect: Cours[] = [];
  montantCours: MontantCours[] = [];
  params = {adherent: null, inscription: null, cours: null, paiements: null};

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private coursService: CoursService ) {
    this.getParam();
    this.coursService.getAll().subscribe(cours => {
      this.coursListe = cours;
    });
    this.coursService.getMontant().subscribe( montantCours => {
      this.montantCours = montantCours;
    });
    this.formCours = this.formBuilder.group({
      cours: ['',  Validators.required],
    });
  }

  ngOnInit() {
  }
  add(){
    this.formCours.value.cours.forEach((id) => {
      this.coursListe.forEach((cours) => {
        if (cours.id === id && !this.coursSelect.includes(cours)){
          this.coursSelect.push(cours);
        }
      });
    });
    this.refreshMontant();
    this.formCours.reset();
  }

  remove(cours){
    this.coursSelect.splice(this.coursSelect.indexOf(cours), 1);
    this.refreshMontant();
  }

  refreshMontant(){
    if (this.coursSelect.length === 0){
      this.montant = 0;
    } else {
      this.montantCours.forEach((montantCour) => {
        if (montantCour.nombre <= this.coursSelect.length) {
         this.montant = montantCour.montant;
        }
      });
    }
  }

  addCours(){
    document.getElementById('cours_question').style.display = 'none';
    document.getElementById('cours').style.display = 'block';
    document.getElementById('footer').style.display = 'block';
  }

  skip(){
    const inscription = JSON.parse(this.params.inscription) as InscriptionDTO;
    inscription.montant = this.montant;
    const navigationExtras: NavigationExtras = {
      queryParams: {
        adherent: this.params.adherent,
        inscription: JSON.stringify(inscription),
        cours: JSON.stringify(this.coursSelect),
        paiements: this.params.paiements,
      }
    };
    this.router.navigate(['inscription/paiement'], navigationExtras);
  }

  previous(){
    const inscription = JSON.parse(this.params.inscription) as InscriptionDTO;
    inscription.montant = this.montant;
    const navigationExtras: NavigationExtras = {
      queryParams: {
        adherent: this.params.adherent,
        inscription: JSON.stringify(inscription),
        cours: JSON.stringify(this.coursSelect),
        paiements: this.params.paiements,
      }
    };
    this.router.navigate(['inscription/infos'], navigationExtras);
  }

  private getParam(){
    this.route.queryParams.subscribe(params => {
      if (params && params.adherent) {
        this.params.adherent = params.adherent;
        this.params.inscription = params.inscription;
        this.params.cours = params.cours;
        this.params.paiements = params.paiements;
      }
    });
  }

  ionViewWillEnter() {
    this.getParam();
    if (this.params.cours){
      this.addCours();
      this.coursSelect = (JSON.parse(this.params.cours) as Cours[]);
      this.refreshMontant();
    }
  }

}
