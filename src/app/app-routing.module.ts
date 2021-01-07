import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuardServiceService} from './service/auth-guard-service.service';

const routes: Routes = [
  {
    path: 'connexion',
    loadChildren: () => import('./page/home/home.module').then(m => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'connexion',
    pathMatch: 'full'
  },
  {
    path: 'menu',
    loadChildren: () => import('./page/menu/menu.module').then(m => m.MenuPageModule),
    canActivate: [AuthGuardServiceService]
  },
  {
    path: 'inscription',
    loadChildren: () => import('./page/inscription/inscription.module').then(m => m.InscriptionPageModule),
    canActivate: [AuthGuardServiceService]
  },
  {
    path: 'inscription/cours',
    loadChildren: () => import('./page/inscription3/inscription3.module').then(m => m.Inscription3PageModule),
    canActivate: [AuthGuardServiceService]
  },
  {
    path: 'inscription/paiement',
    loadChildren: () => import('./page/inscription4/inscription4.module').then(m => m.Inscription4PageModule),
    canActivate: [AuthGuardServiceService]
  },
  {
    path: 'inscription/infos',
    loadChildren: () => import('./page/inscription2/inscription2.module').then(m => m.Inscription2PageModule),
    canActivate: [AuthGuardServiceService]
  },
  {
    path: 'inscription/validation',
    loadChildren: () => import('./page/inscription-recap/inscription-recap.module').then(m => m.InscriptionRecapPageModule),
    canActivate: [AuthGuardServiceService]
  },
  {
    path: 'admin/gestion-droit',
    loadChildren: () => import('./page/admin/gestion-droit/gestion-droit.module').then(m => m.GestionDroitPageModule),
    canActivate: [AuthGuardServiceService]
  },
  {
    path: 'admin/utilisateur',
    loadChildren: () => import('./page/admin/create-utilisateur/create-utilisateur.module').then(m => m.CreateUtilisateurPageModule),
    canActivate: [AuthGuardServiceService]
  },
  {
    path: 'admin/utilisateur/gestion',
    loadChildren: () => import('./page/admin/gestion-utilisateur/gestion-utilisateur.module').then(m => m.GestionUtilisateurPageModule),
    canActivate: [AuthGuardServiceService]
  },
  {
    path: 'admin/role',
    loadChildren: () => import('./page/admin/gestion-role/gestion-role.module').then(m => m.GestionRolePageModule),
    canActivate: [AuthGuardServiceService]
  },
  {
    path: 'cours/montant',
    loadChildren: () => import('./page/montant-cour/montant-cour.module').then(m => m.MontantCourPageModule),
    canActivate: [AuthGuardServiceService]
  },
  {
    path: 'adherent/recherche',
    loadChildren: () => import('./page/recherche-adherent/recherche-adherent.module').then(m => m.RechercheAdherentPageModule),
    canActivate: [AuthGuardServiceService]
  },
  {
    path: 'inscription/recherche',
    loadChildren: () => import('./page/recherche-inscription/recherche-inscription.module').then(m => m.RechercheInscriptionPageModule),
    canActivate: [AuthGuardServiceService]
  },
  {
    path: 'admin/saison',
    loadChildren: () => import('./page/admin/saison/saison.module').then(m => m.SaisonPageModule),
    canActivate: [AuthGuardServiceService]

  },
  {
    path: 'adherent',
    loadChildren: () => import('./page/adherent/adherent.module').then(m => m.AdherentPageModule),
    canActivate: [AuthGuardServiceService]
  },
  {
    path: 'inscription/details',
    loadChildren: () => import('./page/inscription-update/inscription-update.module').then(m => m.InscriptionUpdatePageModule),
    canActivate: [AuthGuardServiceService]
  },
  {
    path: 'professeur',
    loadChildren: () => import('./page/professeur/professeur.module').then(m => m.ProfesseurPageModule),
    canActivate: [AuthGuardServiceService]

  },
  {
    path: 'cours',
    loadChildren: () => import('./page/cours-gestion/cours-gestion.module').then(m => m.CoursGestionPageModule),
    canActivate: [AuthGuardServiceService]

  },
  {
    path: 'cours/type',
    loadChildren: () => import('./page/type-cours/type-cours.module').then(m => m.TypeCoursPageModule),
    canActivate: [AuthGuardServiceService]
  },
  {
    path: 'param',
    loadChildren: () => import('./page/param/param.module').then(m => m.ParamPageModule),
    canActivate: [AuthGuardServiceService]
  },
  {
    path: 'statistique',
    loadChildren: () => import('./page/statistique/statistique.module').then(m => m.StatistiquePageModule),
    canActivate: [AuthGuardServiceService]
  },
  {
    path: 'salle',
    loadChildren: () => import('./page/gestion-salle/gestion-salle.module').then(m => m.GestionSallePageModule),
    canActivate: [AuthGuardServiceService]
  }

















];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
