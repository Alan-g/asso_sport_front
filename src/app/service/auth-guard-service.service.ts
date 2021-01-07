import { Injectable } from '@angular/core';
import {LoginService} from './login.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {strict} from 'assert';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardServiceService implements CanActivate{

  private annuaire: [] = [];

  constructor(private loginService: LoginService, private router: Router) {
    this.annuaire['inscription'] = 'cri';
    this.annuaire['cours/montant'] = 'tar';
    this.annuaire['adherent/recherche'] = 'rca';
    this.annuaire['inscription/recherche'] = 'rci';
    this.annuaire['adherent'] = 'rca';
    this.annuaire['inscription/details'] = 'rci';
    this.annuaire['professeur'] = 'prf';
    this.annuaire['cours'] = 'crs';
    this.annuaire['typeCours'] = 'typ';
    this.annuaire['statistique'] = 'sta';
    this.annuaire['salle'] = 'sal';
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.loginService.getToken() || this.loginService.tokenExpire()) {
      this.router.navigate(['/']);
      return false;
    }
    this.loginService.addInfoCompte();
    if (route.routeConfig.path.includes('admin')){
      return this.loginService.haveRole('Administrateur');
    }
    if (route.routeConfig.path === 'menu' || route.routeConfig.path === 'param')  {
      return true;
    }
    if (this.annuaire[route.routeConfig.path]) {
      return this.loginService.haveDroit(this.annuaire[route.routeConfig.path]);

    }
    return true;
  }
}
