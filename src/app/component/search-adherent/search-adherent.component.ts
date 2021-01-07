import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AdherentService} from '../../service/adherent.service';
import {Adherent} from '../../class/Adherent';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-search-adherent',
  templateUrl: './search-adherent.component.html',
  styleUrls: ['./search-adherent.component.scss'],
})
export class SearchAdherentComponent implements OnInit  {

  datepipe = new DatePipe('en-US');
  adherents: Adherent[] = [];
  load = false;
  constructor(private modalController: ModalController,
              private adherentService: AdherentService) { }

  ngOnInit() {}

  close(){
    this.modalController.dismiss();
  }

  selectAdherent(adherent: Adherent){
    this.modalController.dismiss(adherent);
  }

  onChange(event){
    this.load = true;
    if (event.detail.value !== '') {
      const value = event.detail.value;
      this.adherentService.getByNameWithoutInscription(value).subscribe(x => {
        this.adherents = x === null ? [] : x;
        this.load = false;
      });
    }else {
      this.adherents = [];
      this.load = false;
    }
  }

}
