import { Injectable } from '@angular/core';
import {AssoService} from './AssoService';
import {Observable} from 'rxjs';
import {TypeCours} from '../class/TypeCours';
import {CreateTypeCoursCommand} from '../class/command/CreateTypeCoursCommand';
import {Salle} from '../class/Salle';
import {CreateSalleCommand} from '../class/command/CreateSalleCommand';

@Injectable({
  providedIn: 'root'
})
export class SalleService  extends AssoService {

  getAll(): Observable<Salle[]> {
    return this.httpClient.get<Salle[]>(this.generateUrl('/salle/'), this.getConfigWithToken());
  }

  getById(id: number): Observable<Salle> {
    return this.httpClient.get<Salle>(this.generateUrl('/salle/' + id), this.getConfigWithToken());
  }

  create(command: CreateSalleCommand): Observable<string> {
    return this.httpClient.post<string>(this.generateUrl('/salle/'), JSON.stringify(command), this.getConfigWithToken());
  }

  update(id: number, command: CreateSalleCommand): Observable<string> {
    return this.httpClient.patch<string>(this.generateUrl('/salle/' + id), JSON.stringify(command), this.getConfigWithToken());
  }

  delete(id: number): Observable<string> {
    return this.httpClient.delete<string>(this.generateUrl('/salle/' + id), this.getConfigWithToken());
  }
}
