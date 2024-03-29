import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AppartementItemComponent} from "./components/appartement/appartement-item/appartement-item.component";
import {AuthGuard} from "./guards/auth.guard";
import {AppartementPeriodeManageComponent} from "./components/appartement/appartement-item/appartement-periode/appartement-periode-manage/appartement-periode-manage.component";
import {AppartementContactManageComponent} from "./components/appartement/appartement-item/appartement-contact/appartement-contact-manage/appartement-contact-manage.component";
import {AppartementFraisManageComponent} from "./components/appartement/appartement-item/appartement-frais/appartement-frais-manage/appartement-frais-manage.component";
import {AppartementDescManageComponent} from "./components/appartement/appartement-item/appartement-desc/appartement-desc-manage/appartement-desc-manage.component";
import {AppartementPictureManageComponent} from "./components/appartement/appartement-item/appartement-picture/appartement-picture-manage/appartement-picture-manage.component";
import {AppartementAddComponent} from "./components/appartement/appartement-add/appartement-add.component";
import {UtilisateurAddComponent} from "./components/utilisateur/utilisateur-add/utilisateur-add.component";
import {UtilisateurLoginComponent} from "./components/utilisateur/utilisateur-login/utilisateur-login.component";
import {AppartementGestionnaireManageComponent} from "./components/appartement/appartement-item/appartement-gestionnaire/appartement-gestionnaire-manage/appartement-gestionnaire-manage.component";
import {DashboardFinancesComponent} from "./components/finances/dashboard-finances/dashboard-finances.component";
import {MouvementAddComponent} from "./components/finances/mouvement-add/mouvement-add.component";
import {MouvementUpdateComponent} from "./components/finances/mouvement-update/mouvement-update.component";
import {ImpotsCalculateurComponent} from "./components/finances/impots-calculateur/impots-calculateur.component";


const routes: Routes = [

  // Home

  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

  // Registration

  { path: 'login', component: UtilisateurLoginComponent },
  { path: 'create', component: UtilisateurAddComponent, pathMatch: 'full'  },


  { path: 'appartement/:id', component: AppartementItemComponent, canActivate: [AuthGuard] },
  { path: 'appartements/add', component: AppartementAddComponent, canActivate: [AuthGuard]},

  // Manage

  { path: 'appartement/:id/periodes', component: AppartementPeriodeManageComponent, canActivate: [AuthGuard] },
  { path: 'appartement/:id/contacts', component: AppartementContactManageComponent, canActivate: [AuthGuard] },
  { path: 'appartement/:id/frais', component: AppartementFraisManageComponent, canActivate: [AuthGuard] },
  { path: 'appartement/:id/description', component: AppartementDescManageComponent, canActivate: [AuthGuard] },
  { path: 'appartement/:id/photos', component: AppartementPictureManageComponent, canActivate: [AuthGuard] },
  { path: 'appartement/:id/gestionnaires', component: AppartementGestionnaireManageComponent, canActivate: [AuthGuard] },
  { path: 'finances', component: DashboardFinancesComponent, canActivate: [AuthGuard] },
  { path: 'finances/ajouter-mouvement', component: MouvementAddComponent, canActivate: [AuthGuard] },
  { path: 'finances/editer-mouvement/:id', component: MouvementUpdateComponent, canActivate: [AuthGuard] },
  { path: 'finances/calculateur-impots', component: ImpotsCalculateurComponent, canActivate: [AuthGuard] },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
