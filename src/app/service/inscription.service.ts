import { Injectable } from '@angular/core';
import {AssoService} from './AssoService';
import {Observable} from 'rxjs';
import {InscriptionDTO} from '../class/InscriptionDTO';
import {UpdateInscriptionCommand} from '../class/command/UpdateInscriptionCommand';
import {AddCoursInscriptionCommand} from '../class/command/AddCoursInscriptionCommand';
import {RemoveCoursInscriptionCommand} from '../class/command/RemoveCoursInscriptionCommand';
import {UpdatePaiementInscriptionCommand} from '../class/command/UpdatePaiementInscriptionCommand';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService extends AssoService{

  public create(createCommande): Observable<string>{
    return this.httpClient.post<string>(this.generateUrl('/inscription'), JSON.stringify(createCommande), this.getConfigWithToken());
  }

  public update(id: number, command: UpdateInscriptionCommand): Observable<string>{
    return this.httpClient.patch<string>(this.generateUrl('/inscription/' + id), JSON.stringify(command), this.getConfigWithToken());
  }

  public updatePaiement(id: number, command: UpdatePaiementInscriptionCommand): Observable<string>{
    return this.httpClient.patch<string>(this.generateUrl('/inscription/' + id + '/paiement'), JSON.stringify(command), this.getConfigWithToken());
  }

  public addCours(id: number, command: AddCoursInscriptionCommand): Observable<string> {
    return this.httpClient.patch<string>(this.generateUrl('/inscription/' + id + '/cours'), JSON.stringify(command), this.getConfigWithToken());
  }

  public removeCours(id: number, command: RemoveCoursInscriptionCommand): Observable<string> {
    return this.httpClient.patch<string>(this.generateUrl('/inscription/' + id + '/cours/remove'), JSON.stringify(command), this.getConfigWithToken());
  }

  public getByAdherent(id: number): Observable<InscriptionDTO[]> {
    return this.httpClient.get<InscriptionDTO[]>(this.generateUrl('adherent/' + id + '/inscription'), this.getConfigWithToken());
  }

  public getByAdherentAndAnnee(id: number, anneeId: number): Observable<InscriptionDTO> {
    return this.httpClient.get<InscriptionDTO>(this.generateUrl('adherent/' + id + '/inscription/' + anneeId), this.getConfigWithToken());
  }
}
