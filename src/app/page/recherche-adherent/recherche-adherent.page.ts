import { Component, OnInit } from '@angular/core';
import {AdherentService} from '../../service/adherent.service';
import {Adherent} from '../../class/Adherent';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-recherche-adherent',
  templateUrl: './recherche-adherent.page.html',
  styleUrls: ['./recherche-adherent.page.scss'],
})
export class RechercheAdherentPage implements OnInit {

  adherents: Adherent[] = [];
  load = false;
  constructor(private adherentService: AdherentService, private router: Router) { }

  ngOnInit() {
  }

  searchAdherent(event){
    if (event.detail.value.trim() !== '') {
      this.load = true;
      const value = event.detail.value.trim();
      this.adherentService.getByNameWithoutParam(value).subscribe(x => {
        this.load = false;
        this.adherents = x === null ? [] : x;
      });
    }else {
      this.load = false;
      this.adherents = [];
    }
  }

  click(id){
    const navigationExtras: NavigationExtras = {
    queryParams: {
      id
    }};
    this.router.navigate(['adherent'], navigationExtras);
}
  ionViewWillEnter() {
  }

  }
