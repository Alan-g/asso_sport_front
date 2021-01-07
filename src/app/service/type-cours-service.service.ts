import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Cours} from '../class/Cours';
import {AssoService} from './AssoService';
import {TypeCours} from '../class/TypeCours';
import {CreateTypeCoursCommand} from '../class/command/CreateTypeCoursCommand';

@Injectable({
  providedIn: 'root'
})
export class TypeCoursServiceService extends AssoService{

  getAll(): Observable<TypeCours[]> {
    return this.httpClient.get<TypeCours[]>(this.generateUrl('/typeCours/'), this.getConfigWithToken());
  }

  getById(id: number): Observable<TypeCours> {
    return this.httpClient.get<TypeCours>(this.generateUrl('/typeCours/' + id), this.getConfigWithToken());
  }

  create(command: CreateTypeCoursCommand): Observable<string> {
    return this.httpClient.post<string>(this.generateUrl('/typeCours/'), JSON.stringify(command), this.getConfigWithToken());
  }

  update(id: number, command: CreateTypeCoursCommand): Observable<string> {
    return this.httpClient.patch<string>(this.generateUrl('/typeCours/' + id), JSON.stringify(command), this.getConfigWithToken());
  }

  delete(id: number): Observable<string> {
    return this.httpClient.delete<string>(this.generateUrl('/typeCours/' + id), this.getConfigWithToken());
  }
}
