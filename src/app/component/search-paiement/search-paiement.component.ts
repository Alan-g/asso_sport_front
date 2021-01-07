import { Component, OnInit } from '@angular/core';
import {DatePipe} from '@angular/common';
import {Adherent} from '../../class/Adherent';
import {ModalController} from '@ionic/angular';
import {AdherentService} from '../../service/adherent.service';
import {Paiement} from '../../class/Paiement';
import {PaiementService} from '../../service/paiement.service';

@Component({
  selector: 'app-search-paiement',
  templateUrl: './search-paiement.component.html',
  styleUrls: ['./search-paiement.component.scss'],
})
export class SearchPaiementComponent implements OnInit {

  datepipe = new DatePipe('en-US');
  paiements: Paiement[] = [];
  load = false;
  constructor(private modalController: ModalController,
              private paiementService: PaiementService) { }

  ngOnInit() {}

  close(){
    this.modalController.dismiss();
  }

  selectPaiement(paiement: Paiement){
    this.modalController.dismiss(paiement);
  }

  onChange(event){
    this.load = true;
    if (event.detail.value !== '') {
      const value = event.detail.value;
      this.paiementService.getByPayeur(value).subscribe(x => {
        this.paiements = x === null ? [] : x;
        this.load = false;
      });
    }else {
      this.paiements = [];
      this.load = false;
    }
  }

}
