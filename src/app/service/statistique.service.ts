import { Injectable } from '@angular/core';
import {AssoService} from './AssoService';
import {Observable} from 'rxjs';
import {TypeCours} from '../class/TypeCours';
import {ColumnChart} from '../class/ColumnChart';
import {StatsAnnee} from '../class/StatsAnnee';
import {PieChart} from '../class/PieChart';
import {StatsCours} from '../class/StatsCours';
import {StatsSemaine} from '../class/StatsSemaine';
import {Extraction} from '../class/Extraction';
import {ExtractionCours} from '../class/ExtractionCours';

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService extends AssoService {

  getAdherentByAnnee(): Observable<ColumnChart[]> {
    return this.httpClient.get<ColumnChart[]>(this.generateUrl('/statistique/adherent/annee'), this.getConfigWithToken());
  }

  getStatsAnneeActif(): Observable<StatsAnnee> {
    return this.httpClient.get<StatsAnnee>(this.generateUrl('/statistique/annee'), this.getConfigWithToken());
  }

  getStatsCours(): Observable<StatsSemaine> {
    return this.httpClient.get<StatsSemaine>(this.generateUrl('/statistique/cours'), this.getConfigWithToken());
  }

  getStatsDureeCours(): Observable<PieChart> {
    return this.httpClient.get<PieChart>(this.generateUrl('/statistique/cours/heure'), this.getConfigWithToken());
  }

  getStatsPyramideAge(): Observable<ColumnChart[]> {
    return this.httpClient.get<ColumnChart[]>(this.generateUrl('/statistique/age'), this.getConfigWithToken());
  }

  extrcationAdherent(): Observable<Extraction[]> {
    return this.httpClient.get<Extraction[]>(this.generateUrl('/extraction/inscription'), this.getConfigWithToken());
  }

  extrcationAdherentCours(): Observable<ExtractionCours[]> {
    return this.httpClient.get<ExtractionCours[]>(this.generateUrl('/extraction/cours'), this.getConfigWithToken());
  }

}
