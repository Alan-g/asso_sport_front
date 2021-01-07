import { Injectable } from '@angular/core';
import {AssoService} from './AssoService';
import {Observable} from 'rxjs';
import {Prof} from '../class/Prof';
import {CreateProfCommand} from '../class/command/CreateProfCommand';
import {identifyDynamicQueryNodes} from '@angular/core/schematics/migrations/dynamic-queries/util';
import {Cours} from '../class/Cours';

@Injectable({
  providedIn: 'root'
})
export class ProfService extends AssoService{

  public getAll(): Observable<Prof[]> {
    return this.httpClient.get<Prof[]>(this.generateUrl('prof'), this.getConfigWithToken());
  }
  public getById(id: number): Observable<Prof> {
    return this.httpClient.get<Prof>(this.generateUrl('prof/' + id), this.getConfigWithToken());
  }
  public delete(id: number): Observable<string> {
    return this.httpClient.delete<string>(this.generateUrl('prof/' + id), this.getConfigWithToken());
  }
  public create(command: CreateProfCommand): Observable<string> {
    return this.httpClient.post<string>(this.generateUrl('prof/' ), JSON.stringify(command), this.getConfigWithToken());
  }
  public update(id: number, command: CreateProfCommand): Observable<string> {
    return this.httpClient.patch<string>(this.generateUrl('prof/' + id), JSON.stringify(command), this.getConfigWithToken());
  }
  public getCours(id: number): Observable<Cours[]> {
    return this.httpClient.get<Cours[]>(this.generateUrl('prof/' + id + '/cours'), this.getConfigWithToken());
  }
}
