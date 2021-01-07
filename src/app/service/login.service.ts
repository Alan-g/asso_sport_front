import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {observableToBeFn} from 'rxjs/internal/testing/TestScheduler';
import {Observable} from 'rxjs';
import {Droit} from '../class/Droit';
import {Infos} from '../class/Infos';
import {AssoService} from './AssoService';

@Injectable({
    providedIn: 'root'
})
export class LoginService{

    constructor(private httpClient: HttpClient ) {
    }

    login(compte: string, mdp: string): Observable<string> {
        return this.httpClient.post<string>('https://url-back/api/auth/login', '{"username":"' + compte + '","password":"' + mdp + '"}');
    }

    addToken(token) {
        localStorage.setItem('token', JSON.stringify(token));
        this.addInfoCompte();
    }

    getToken() {
        return JSON.parse(localStorage.getItem(('token')));
    }

    haveRole(role: string) {
        const obj = JSON.parse(localStorage.getItem(('infos'))) as Infos;
        if (obj === null){
            return false;
        }
        return obj.role.libelle === role;
    }

    haveDroit(trigramme: string){
        const obj = JSON.parse(localStorage.getItem(('infos'))) as Infos;
        if (obj === null){
            return false;
        }
        let haveDroit = false;
        obj.droits.forEach(droit => {
            if (droit.trigramme === trigramme){
                haveDroit = true;
            }
        });
        return haveDroit;
    }

    tokenExpire(): boolean {
        const obj = JSON.parse(localStorage.getItem(('token')));
        if (Date.parse(obj.endDate) > Date.now()) {
            return false;
        }
        return true;
    }

    deleteToken() {
        localStorage.removeItem('token');
        localStorage.removeItem('infos');
    }

    addInfoCompte() {
        return this.httpClient.get<Infos>('https://url-back/api/infos', this.getConfigWithToken()).subscribe( infos => {
            localStorage.setItem('infos', JSON.stringify(infos));
        });
    }

    private getConfigWithToken(): {} {
        return {headers: {'Content-type': 'application/json',
                'Auth-token': this.getToken().token.trim()} };
    }

}
