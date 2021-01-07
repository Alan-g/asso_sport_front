import { Injectable } from '@angular/core';
import {AssoService} from './AssoService';
import {Observable} from 'rxjs';
import {Role} from '../class/Role';
import {Droit} from '../class/Droit';
import {CreateUserCommand} from '../class/command/CreateUserCommand';
import {AddRemoveDroitCommand} from '../class/command/AddRemoveDroitCommand';
import {User} from '../class/User';
import {UpdateUserCommand} from '../class/command/UpdateUserCommand';
import {CreateRoleCommand} from '../class/command/CreateRoleCommand';
import {CreateSaisonCommand} from '../class/command/CreateSaisonCommand.ts';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends AssoService{
  getAllRole(): Observable<Role[]>{
    return this.httpClient.get<Role[]>(this.generateUrl('admin/role'), this.getConfigWithToken());
  }

  getRoleByDroit(idDroit: number): Observable<Role[]>{
    return this.httpClient.get<Role[]>(this.generateUrl('admin/droit/' + idDroit + '/role'), this.getConfigWithToken());
  }

  getAllDroit(): Observable<Droit[]>{
    return this.httpClient.get<Droit[]>(this.generateUrl('/admin/droit'), this.getConfigWithToken());
  }

  getDroitByRole(idRole: number): Observable<Droit[]> {
    return this.httpClient.get<Droit[]>(this.generateUrl('/admin/role/' + idRole + '/droit'), this.getConfigWithToken());
  }

  createUser(command: CreateUserCommand): Observable<string> {
    return this.httpClient.post<string>(this.generateUrl('admin/user'), JSON.stringify(command), this.getConfigWithToken());
  }

  addDroit(idRole: number, command: AddRemoveDroitCommand): Observable<string> {
    return this.httpClient.post<string>(this.generateUrl('admin/role/' + idRole + '/droit'), JSON.stringify(command), this.getConfigWithToken());
  }
  deleteDroit(idRole: number, command: AddRemoveDroitCommand): Observable<string> {
    return this.httpClient.delete<string>(this.generateUrl('admin/role/' + idRole + '/droit/' + command.idDroit), this.getConfigWithToken());
  }
  getAllUser(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.generateUrl('admin/user'), this.getConfigWithToken());
  }

  deleteUser(idUser: string): Observable<string> {
    return this.httpClient.delete<string>(this.generateUrl('admin/user/' + idUser), this.getConfigWithToken());
  }

  getUserById(idUser: string): Observable<User> {
    return this.httpClient.get<User>(this.generateUrl('/admin/user/' + idUser), this.getConfigWithToken());
  }

  updateUser(idUser: number, command: UpdateUserCommand): Observable<string>{
    return this.httpClient.patch<string>(this.generateUrl('/admin/user/' + idUser), JSON.stringify(command), this.getConfigWithToken());
  }

  resetPasswordUser(idUser: number, password: string): Observable<string>{
    return this.httpClient.patch<string>(this.generateUrl('/admin/user/' + idUser + '/password'), '{"password":"' + password + '"}', this.getConfigWithToken());
  }

  deleteRole(idRole): Observable<string> {
    return this.httpClient.delete<string>(this.generateUrl('/admin/role/' + idRole), this.getConfigWithToken());
  }

  createRole(command: CreateRoleCommand): Observable<string> {
    return this.httpClient.post<string>(this.generateUrl('/admin/role'), JSON.stringify(command), this.getConfigWithToken());
  }

  createSaison(command: CreateSaisonCommand): Observable<string> {
    return this.httpClient.post<string>(this.generateUrl('/admin/saison'), JSON.stringify(command), this.getConfigWithToken());
  }
}


