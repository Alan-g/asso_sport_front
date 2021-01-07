import { Injectable } from '@angular/core';
import {AssoService} from './AssoService';
import {Observable} from 'rxjs';
import {Adherent} from '../class/Adherent';
import {Cours} from '../class/Cours';
import {MontantCours} from '../class/MontantCours';
import {UpdateMontantCommand} from '../class/command/UpdateMontantCommand';
import {CreateMontantCommand} from '../class/command/CreateMontantCommand';
import {Prof} from '../class/Prof';
import {CreateProfCommand} from '../class/command/CreateProfCommand';
import {CreateCoursComponent} from '../component/create-cours/create-cours.component';
import {CreateCoursCommand} from '../class/command/CreateCoursCommand';
import {UpdateCoursCommand} from '../class/command/UpdateCoursCommand';

@Injectable({
  providedIn: 'root'
})
export class CoursService extends AssoService{
  getAll(): Observable<Cours[]> {
    return this.httpClient.get<Cours[]>(this.generateUrl('/cours/'), this.getConfigWithToken());
  }

  getMontant(): Observable<MontantCours[]> {
    return this.httpClient.get<MontantCours[]>(this.generateUrl('/montant'), this.getConfigWithToken());
  }

  addMontant(commnad: CreateMontantCommand): Observable<string> {
    return this.httpClient.post<string>(this.generateUrl('/montant'), JSON.stringify(commnad), this.getConfigWithToken());
  }

  deleteMontant(idMontant: number): Observable<string> {
    return this.httpClient.delete<string>(this.generateUrl('/montant/' + idMontant), this.getConfigWithToken());
  }

  updateMontant(idMonant: number, commnad: UpdateMontantCommand): Observable<string> {
    return this.httpClient.patch<string>(this.generateUrl('/montant/' + idMonant), JSON.stringify(commnad), this.getConfigWithToken());
  }
  getByInscription(idInscription: number): Observable<Cours[]>{
    return this.httpClient.get<Cours[]>(this.generateUrl('/inscription/' + idInscription + '/cours' ), this.getConfigWithToken());
  }

  public getById(id: number): Observable<Cours> {
    return this.httpClient.get<Cours>(this.generateUrl('cours/' + id), this.getConfigWithToken());
  }
  public delete(id: number): Observable<string> {
    return this.httpClient.delete<string>(this.generateUrl('cours/' + id), this.getConfigWithToken());
  }
  public create(command: CreateCoursCommand): Observable<string> {
    return this.httpClient.post<string>(this.generateUrl('cours/' ), JSON.stringify(command), this.getConfigWithToken());
  }
  public update(id: number, command: UpdateCoursCommand): Observable<string> {
    return this.httpClient.patch<string>(this.generateUrl('cours/' + id), JSON.stringify(command), this.getConfigWithToken());
  }
  public getAdherent(id: number): Observable<Cours[]> {
    return this.httpClient.get<Cours[]>(this.generateUrl('cours/' + id + '/adherent'), this.getConfigWithToken());
  }
}
