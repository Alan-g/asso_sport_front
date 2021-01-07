import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Adherent} from '../class/Adherent';
import {AssoService} from './AssoService';
import {observableToBeFn} from 'rxjs/internal/testing/TestScheduler';
import {UpdateAdherentCommand} from '../class/command/UpdateAdherentCommand';

@Injectable({
  providedIn: 'root'
})
export class AdherentService extends AssoService {
  getByNameWithoutInscription(nomPrenom: string): Observable<Adherent[]> {
    return this.httpClient.get<Adherent[]>(this.generateUrl('adherent/search/' + nomPrenom + '?inscrit=false'), this.getConfigWithToken());
  }

  getByName(nomPrenom: string, filtres: {key: string, valeur: string}[]): Observable<Adherent[]> {
    filtres.push({key: 'inscrit', valeur: 'true'});
    if (nomPrenom === '' || nomPrenom === null){
      nomPrenom = 'valueNull';
    }
    return this.httpClient.get<Adherent[]>(this.generateUrlWithParam('adherent/search/' + nomPrenom, filtres), this.getConfigWithToken());
  }

  getByNameWithoutParam(nomPrenom: string): Observable<Adherent[]>  {
    return this.httpClient.get<Adherent[]>(this.generateUrl('adherent/search/' + nomPrenom), this.getConfigWithToken());
  }

  getById(id: number): Observable<Adherent> {
    return this.httpClient.get<Adherent>(this.generateUrl('adherent/' + id), this.getConfigWithToken());
  }

  update(id: number, command: UpdateAdherentCommand): Observable<string> {
    return this.httpClient.patch<string>(this.generateUrl('adherent/'+id), JSON.stringify(command), this.getConfigWithToken());
  }


}
