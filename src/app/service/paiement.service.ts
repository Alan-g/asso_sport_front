import { Injectable } from '@angular/core';
import {AssoService} from './AssoService';
import {Observable} from 'rxjs';
import {Paiement} from '../class/Paiement';

@Injectable({
  providedIn: 'root'
})
export class PaiementService extends AssoService{

  getByPayeur(nomPayer: string): Observable<Paiement[]> {
    return this.httpClient.get<Paiement[]>(this.generateUrl('/paiement/search/' + nomPayer), this.getConfigWithToken());
  }

  getByIdInscription(idInscription: number): Observable<Paiement[]> {
    return this.httpClient.get<Paiement[]>(this.generateUrl('/inscription/' + idInscription + '/paiement') , this.getConfigWithToken());
  }
}
