import { Injectable } from '@angular/core';
import {AssoService} from './AssoService';
import {Observable} from 'rxjs';
import {Annee} from '../class/Annee';

@Injectable({
  providedIn: 'root'
})
export class AnneeService extends AssoService{

  getAll(): Observable<Annee[]> {
    return this.httpClient.get<Annee[]>(this.generateUrl('/annee'), this.getConfigWithToken());
  }
}
