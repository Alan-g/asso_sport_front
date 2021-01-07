import { Component, OnInit } from '@angular/core';
import {GoogleChartInterface} from 'ng2-google-charts';
import {StatistiqueService} from '../../service/statistique.service';
import {ColumnChart} from '../../class/ColumnChart';
import {AnneeService} from '../../service/annee.service';
import {Annee} from '../../class/Annee';
import {StatsAnnee} from '../../class/StatsAnnee';
import {StatsSemaine} from '../../class/StatsSemaine';
import {LoadingController, ToastController} from '@ionic/angular';
import {Papa} from 'ngx-papaparse';
import * as XLSX from 'xlsx';
import {Extraction} from '../../class/Extraction';
import {i18nMetaToDocStmt} from '@angular/compiler/src/render3/view/i18n/meta';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.page.html',
  styleUrls: ['./statistique.page.scss'],
})
export class StatistiquePage implements OnInit {

  public columnChart1: GoogleChartInterface;
  public ageChart: GoogleChartInterface;
  public pieChart: GoogleChartInterface;
  public pieDureeCours: GoogleChartInterface;
  public annee: Annee;
  public statsAnnee: StatsAnnee;
  public coursLundi: GoogleChartInterface;
  public coursMardi: GoogleChartInterface;
  public coursMercredi: GoogleChartInterface;
  public coursJeudi: GoogleChartInterface;
  public coursVendredi: GoogleChartInterface;
  public coursSamedi: GoogleChartInterface;
  public coursDimanche: GoogleChartInterface;
  load = 0;
  loadingStart = null;


  constructor(private statistiqueService: StatistiqueService, private anneeService: AnneeService,private toastController: ToastController,
              private loadingController: LoadingController, private papa: Papa) {
  }

  checkAllLoad(){
    if (this.load === 6){
      this.loadingStart.dismiss();
    }
  }

  async ionViewWillEnter() {
    this.loadingStart = await this.loadingController.create({
      message: 'chargement en cours...',
    });
    this.loadingStart.present();

    this.statistiqueService.getAdherentByAnnee().subscribe(column => {
      this.loadColumnChart(column);

      this.load += 1;
      this.checkAllLoad();
    });
    this.anneeService.getAll().subscribe(annees => {
      annees.forEach(annee => {
        if (annee.actif){
          this.annee = annee;
        }
      });

      this.load += 1;
      this.checkAllLoad();
    });
    this.statistiqueService.getStatsAnneeActif().subscribe(stats => {
      this.statsAnnee = stats;
      const tab = [];
      tab.push(['Sexe', 'Pourcentage']);
      stats.repartitionSexe.forEach(col => {
        const foo: (string|number)[] = [ col.name, Number(col.value) ];
        tab.push(foo);
      });
      this.pieChart = {
        chartType: 'PieChart',
        dataTable: tab,
        options: {
          title: 'Répartition sexe:',
          height: 600,
          width: '100%'
        },
      };
      this.load += 1;
      this.checkAllLoad();
    });

    this.statistiqueService.getStatsDureeCours().subscribe(stats => {
      const tab = [];
      tab.push(stats.header);
      stats.pie.forEach(col => {
        const foo: (string|number)[] = [ col.name, Number(col.value) ];
        tab.push(foo);
      });
      this.pieDureeCours = {
        chartType: 'PieChart',
        dataTable: tab,
        options: {
          firstRowIsData: true,
          title: 'Adhérent par heure de cours:',
          height: 600,
          width: '100%',
          colors: ['#1b9e77', '#d95f02', '#7570b3']
        },
      };
      this.load += 1;
      this.checkAllLoad();
    });

    this.statistiqueService.getStatsPyramideAge().subscribe(ages => {
      this.loadAgepyramide(ages);

      this.load += 1;
      this.checkAllLoad();
    });
    this.statistiqueService.getStatsCours().subscribe(stats => {
      this.loadCours(stats);

      this.load += 1;
      this.checkAllLoad();
    });
  }


    loadColumnChart(column: ColumnChart[]) {
    const tab = [];
    tab.push(['Année', 'Adhérent']);
    column.forEach(col => {
      const foo: (string|number)[] = [ col.name, Number(col.value) ];
      tab.push(foo);
    });
    this.columnChart1 = {
      chartType: 'ColumnChart',
      dataTable: tab,
      options: {
        title: 'Nombre d\'adhérent par année ',
        height: 300,
        chartArea: { height: '200' },
        hAxis: {
          title: 'Année',
          minValue: 0
        },
        vAxis: {
          title: 'Total d\'adhérent'
        }
      },
    };
  }

  loadAgepyramide(column: ColumnChart[]) {
    const tab = [];
    tab.push(['Année', 'Adhérent']);
    column.forEach(col => {
      const foo: (string|number)[] = [ col.name, Number(col.value) ];
      tab.push(foo);
    });
    this.ageChart = {
      chartType: 'BarChart',
      dataTable: tab,
      options: {
        title: 'Pyramide des ages',
        height: 300,
        chartArea: { height: '200' },
        hAxis: {
          title: 'Nombre d\'adhérent',
          minValue: 0
        },
        vAxis: {
          title: 'Age'
        }
      },
    };
  }

  loadCours(statsSemaine: StatsSemaine){
    let tab = this.initTab();
    if (statsSemaine.lundi.length > 0) {
      tab = this.initTab();
      statsSemaine.lundi.forEach(statsCours => {
        tab.push([(statsCours.libelleType + ' - ' + statsCours.heureDebut + ' à ' + statsCours.heureFin), statsCours.pourcentage, (statsCours.effectif + '/' + statsCours.limite)]);
      });
      this.coursLundi = {
        chartType: 'ColumnChart',
        dataTable: tab,
        options: {
          title: 'Taux de d\'occupation des cours du lundi',
          height: 400,
          chartArea: {height: '200'},
          annotations: {
            textStyle: {
              fontSize: 12,
              auraColor: 'none',
              color: '#555'
            },
          },
          hAxis: {
            title: 'Cours',
            minValue: 0
          },
          vAxis: {
            title: 'Taux de d\'occupation en %'
          }
        },
      };
    }

    if (statsSemaine.mardi.length > 0) {
      tab = this.initTab();
      statsSemaine.mardi.forEach(statsCours => {
        tab.push([(statsCours.libelleType + ' - ' + statsCours.heureDebut + ' à ' + statsCours.heureFin), statsCours.pourcentage, (statsCours.effectif + '/' + statsCours.limite)]);
      });
      this.coursMardi = {
        chartType: 'ColumnChart',
        dataTable: tab,
        options: {
          title: 'Taux de d\'occupation des cours du Mardi',
          height: 400,
          chartArea: {height: '200'},
          annotations: {
            textStyle: {
              fontSize: 12,
              auraColor: 'none',
              color: '#555'
            },
          },
          hAxis: {
            title: 'Cours',
            minValue: 0
          },
          vAxis: {
            title: 'Taux de d\'occupation en %'
          }
        },
      };
    }

    if (statsSemaine.mercredi.length > 0) {
      tab = this.initTab();
      statsSemaine.mercredi.forEach(statsCours => {
        tab.push([(statsCours.libelleType + ' - ' + statsCours.heureDebut + ' à ' + statsCours.heureFin), statsCours.pourcentage, (statsCours.effectif + '/' + statsCours.limite)]);
      });
      this.coursMercredi = {
        chartType: 'ColumnChart',
        dataTable: tab,
        options: {
          title: 'Taux de d\'occupation des cours du Mercredi',
          height: 400,
          chartArea: {height: '200'},
          annotations: {
            textStyle: {
              fontSize: 12,
              auraColor: 'none',
              color: '#555'
            },
          },
          hAxis: {
            title: 'Cours',
            minValue: 0
          },
          vAxis: {
            title: 'Taux de d\'occupation en %'
          }
        },
      };
    }

    if (statsSemaine.jeudi.length > 0) {
      tab = this.initTab();
      statsSemaine.jeudi.forEach(statsCours => {
        tab.push([(statsCours.libelleType + ' - ' + statsCours.heureDebut + ' à ' + statsCours.heureFin), statsCours.pourcentage, (statsCours.effectif + '/' + statsCours.limite)]);
      });
      this.coursJeudi = {
        chartType: 'ColumnChart',
        dataTable: tab,
        options: {
          title: 'Taux de d\'occupation des cours du Jeudi',
          height: 400,
          chartArea: {height: '200'},
          annotations: {
            textStyle: {
              fontSize: 12,
              auraColor: 'none',
              color: '#555'
            },
          },
          hAxis: {
            title: 'Cours',
            minValue: 0
          },
          vAxis: {
            title: 'Taux de d\'occupation en %'
          }
        },
      };
    }

    if (statsSemaine.vendredi.length > 0) {
      tab = this.initTab();
      statsSemaine.vendredi.forEach(statsCours => {
        tab.push([(statsCours.libelleType + ' - ' + statsCours.heureDebut + ' à ' + statsCours.heureFin), statsCours.pourcentage, (statsCours.effectif + '/' + statsCours.limite)]);
      });
      this.coursVendredi = {
        chartType: 'ColumnChart',
        dataTable: tab,
        options: {
          title: 'Taux de d\'occupation des cours du Vendredi',
          height: 400,
          chartArea: {height: '200'},
          annotations: {
            textStyle: {
              fontSize: 12,
              auraColor: 'none',
              color: '#555'
            },
          },
          hAxis: {
            title: 'Cours',
            minValue: 0
          },
          vAxis: {
            title: 'Taux de d\'occupation en %'
          }
        },
      };
    }

    if (statsSemaine.samedi.length > 0) {
      tab = this.initTab();
      statsSemaine.samedi.forEach(statsCours => {
        tab.push([(statsCours.libelleType + ' - ' + statsCours.heureDebut + ' à ' + statsCours.heureFin), statsCours.pourcentage, (statsCours.effectif + '/' + statsCours.limite)]);
      });
      this.coursSamedi = {
        chartType: 'ColumnChart',
        dataTable: tab,
        options: {
          title: 'Taux de d\'occupation des cours du Samedi',
          height: 400,
          chartArea: {height: '200'},
          annotations: {
            textStyle: {
              fontSize: 12,
              auraColor: 'none',
              color: '#555'
            },
          },
          hAxis: {
            title: 'Cours',
            minValue: 0
          },
          vAxis: {
            title: 'Taux de d\'occupation en %'
          }
        },
      };
    }

    if (statsSemaine.dimanche.length > 0) {
      tab = this.initTab();
      statsSemaine.dimanche.forEach(statsCours => {
        tab.push([(statsCours.libelleType + ' - ' + statsCours.heureDebut + ' à ' + statsCours.heureFin), statsCours.pourcentage, (statsCours.effectif + '/' + statsCours.limite)]);
      });
      this.coursDimanche = {
        chartType: 'ColumnChart',
        dataTable: tab,
        options: {
          title: 'Taux de d\'occupation des cours du Dimanche',
          height: 400,
          chartArea: {height: '200'},
          annotations: {
            textStyle: {
              fontSize: 12,
              auraColor: 'none',
              color: '#555'
            },
          },
          hAxis: {
            title: 'Cours',
            minValue: 0
          },
          vAxis: {
            title: 'Taux de d\'occupation en %'
          }
        },
      };
    }
  }

  initTab(){
    const tab = [];
    tab.push(['Cours', 'Taux de d\'occupation', {type: 'string', role: 'annotation'}]);
    return tab;
  }

  ngOnInit(): void {
  }

  async extractionAdherent(){
    const loading = await this.loadingController.create({
      message: 'Extraction en cours... \n Veuillez patienter cela peut durée plusieurs minutes',
    });
    loading.present();
    this.statistiqueService.extrcationAdherent().subscribe(extraction => {
          loading.dismiss();
          const wb = XLSX.utils.book_new();
          wb.Props = {
            Title: 'Extraction',
            CreatedDate: new Date((new Date()).getFullYear(), (new Date()).getMonth(),(new Date()).getDay())
          };
          wb.SheetNames.push('Extraction inscription');
          wb.Sheets['Extraction inscription'] = XLSX.utils.json_to_sheet(extraction);
          const wbout = XLSX.write(wb, {bookType: 'xlsx',  type: 'binary'});
          this.exportCsv(wbout, 'adherent_inscrit');
        },
        error => {
          loading.dismiss();
          this.presentToast(error.error.error ? error.error.error : 'Erreur lors de l\'extraction ', 'danger');
        });
  }

  async extractionAdherentCours(){
    const loading = await this.loadingController.create({
      message: 'Extraction en cours... \n Veuillez patienter cela peut durée plusieurs minutes',
    });
    loading.present();
    this.statistiqueService.extrcationAdherentCours().subscribe(extractions => {
          const wb = XLSX.utils.book_new();
          wb.Props = {
            Title: 'Extraction',
            CreatedDate: new Date((new Date()).getFullYear(), (new Date()).getMonth(),(new Date()).getDay())
          };
          let count = 1;
          let jour = '';
          extractions.forEach(extra => {
            if (jour === extra.courJour){
              count += 1;
            }else {
              count = 1;
            }
            jour = extra.courJour;
            let name = extra.courJour + ' - ' + count;
            name = name.slice(0, 31);
            wb.SheetNames.push(name);
            const data = [['nom', 'prenom', 'téléphone', 'mail']];
            extra.extractions.forEach(extraction => {
              data.push([extraction.nom, extraction.prenom, extraction.tel, extraction.mail]);
            });

            let modif = data[0].concat(['', 'Cours : ', extra.coursLibelle]);
            data[0] = modif;
            if (data.length > 2) {
              modif = data[1].concat(['', 'Jour:', extra.courJour + ' - ' + extra.courDateDebut + ' à ' + extra.courDateFin]);
              data[1] = modif;
            }else {
              data.push(['', '', '', '', '', 'Jour:', extra.courJour + ' - ' + extra.courDateDebut + ' à ' + extra.courDateFin]);
            }
            if (data.length > 3) {
              modif = data[2].concat(['', 'Professeur:', extra.prof]);
              data[2] = modif;
            }else {
              data.push(['', '', '', '', '', 'Professeur:', extra.prof]);
            }
            wb.Sheets[name] = XLSX.utils.aoa_to_sheet(data);
          });
          const wbout = XLSX.write(wb, {bookType: 'xlsx',  type: 'binary'});
          this.exportCsv(wbout, 'inscription_cours');
          loading.dismiss();
        },
        error => {
          loading.dismiss();
          this.presentToast(error.error.error ? error.error.error : 'Erreur lors de l\'extraction ', 'danger');
        });
  }

  async presentToast(message, color) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
    });
    toast.present();
  }


  exportCsv(wbout, name: string) {
    const blob = new Blob([this.s2ab(wbout)], {type: 'application/octet-stream'});
    const a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = name + '.xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }
}
