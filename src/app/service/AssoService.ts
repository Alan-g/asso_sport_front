import {LoginService} from './login.service';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export abstract class AssoService {

    private baseUrl = 'https://url-back/api/';

    constructor(private loginService: LoginService,
                protected httpClient: HttpClient) {}

    protected getConfig(): {} {
        return {headers: {'Content-type': 'application/json'} };
    }

    protected getConfigWithToken(): {} {
        return {headers: {'Content-type': 'application/json',
                'Auth-token': this.loginService.getToken().token.trim()} };
    }

    protected generateUrl(prefix: string) {
        if (prefix[0] === '/'){
            prefix = prefix.substr(1);
        }
        return this.baseUrl + prefix;
    }

    protected generateUrlWithParam(prefix: string, filtres: {key: string, valeur: string}[]) {
        if (prefix[0] === '/'){
            prefix = prefix.substr(1);
        }
        let url = this.baseUrl + prefix + '?';
        let paramNumber = 0;
        for (const filtre of filtres) {
            if (paramNumber === 0 ) {
                url += filtre.key + '=' + filtre.valeur;
            } else {
                url += '&' + filtre.key + '=' + filtre.valeur;
            }
            paramNumber += 1;
        }
        return url;
    }

}
