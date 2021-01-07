import { Injectable } from '@angular/core';
import {AssoService} from './AssoService';
import {Observable} from 'rxjs';
import {User} from '../class/User';
import {ChangePasswordCommand} from '../class/command/ChangePasswordCommand';

@Injectable({
  providedIn: 'root'
})
export class UserService extends AssoService{

  getOne(): Observable<User> {
    return this.httpClient.get<User>(this.generateUrl('/user'), this.getConfigWithToken());
  }

  changePassword(command: ChangePasswordCommand): Observable<string> {
    return this.httpClient.post<string>(this.generateUrl('/user/password'), JSON.stringify(command), this.getConfigWithToken());
  }
}
