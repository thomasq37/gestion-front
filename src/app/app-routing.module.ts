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
import {LogementsComponent} from "./components/v2/logements/logements.component";
import {ConnexionComponent} from "./components/v2/connexion/connexion.component";
import {AlreadyAuthGuard} from "./guards/already-auth.guard";
import {InscriptionComponent} from "./components/v2/inscription/inscription.component";
import {LogementComponent} from "./components/v2/logement/logement.component";
import {AdresseCreerComponent} from "./components/v2/adresse/adresse-creer/adresse-creer.component";
import {AdresseModifierComponent} from "./components/v2/adresse/adresse-modifier/adresse-modifier.component";
import {
  CaracteristiquesCreerComponent
} from "./components/v2/caracteristiques/caracteristiques-creer/caracteristiques-creer.component";
import {
  CaracteristiquesModifierComponent
} from "./components/v2/caracteristiques/caracteristiques-modifier/caracteristiques-modifier.component";
import {LocataireCreerComponent} from "./components/v2/locataire/locataire-creer/locataire-creer.component";
import {ContactCreerComponent} from "./components/v2/contact/contact-creer/contact-creer.component";
import {LocataireModifierComponent} from "./components/v2/locataire/locataire-modifier/locataire-modifier.component";
import {ContactModifierComponent} from "./components/v2/contact/contact-modifier/contact-modifier.component";
import {PhotosModifierComponent} from "./components/v2/photo/photos-modifier/photos-modifier.component";
import {
  PeriodeLocationCreerComponent
} from "./components/v2/periode-location/periode-location-creer/periode-location-creer.component";
import {
  PeriodeLocationModifierComponent
} from "./components/v2/periode-location/periode-location-modifier/periode-location-modifier.component";


const routes: Routes = [

  // Home

  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

  // Registration

  { path: 'create', component: UtilisateurAddComponent, pathMatch: 'full'  },

  { path: 'appartement/:id', component: AppartementItemComponent, canActivate: [AuthGuard] },
  { path: 'appartements/add', component: AppartementAddComponent, canActivate: [AuthGuard]},

  // Manage

  { path: 'appartement/:id/periodes', component: AppartementPeriodeManageComponent, canActivate: [AuthGuard] },
  { path: 'appartement/:id/contacts', component: AppartementContactManageComponent, canActivate: [AuthGuard] },
  { path: 'appartement/:id/frais', component: AppartementFraisManageComponent, canActivate: [AuthGuard] },
  { path: 'appartement/:id/description', component: AppartementDescManageComponent, canActivate: [AuthGuard] },
  { path: 'appartement/:id/photos', component: AppartementPictureManageComponent, canActivate: [AuthGuard] },
  // v2 //
  { path: 'logements', component: LogementsComponent, canActivate: [AuthGuard] },
  { path: 'connexion', component: ConnexionComponent, canActivate: [AlreadyAuthGuard] },
  { path: 'inscription', component: InscriptionComponent, canActivate: [AlreadyAuthGuard] },
  { path: 'logements/:logementMasqueId', component: LogementComponent, canActivate: [AuthGuard] },
  { path: 'logements/:logementMasqueId/adresse/creer', component: AdresseCreerComponent, canActivate: [AuthGuard] },
  { path: 'logements/:logementMasqueId/adresse/modifier', component: AdresseModifierComponent, canActivate: [AuthGuard] },
  { path: 'logements/:logementMasqueId/caracteristiques/creer', component: CaracteristiquesCreerComponent, canActivate: [AuthGuard] },
  { path: 'logements/:logementMasqueId/caracteristiques/modifier', component: CaracteristiquesModifierComponent, canActivate: [AuthGuard] },
  { path: 'logements/:logementMasqueId/locataire/creer', component: LocataireCreerComponent, canActivate: [AuthGuard] },
  { path: 'logements/:logementMasqueId/locataire/:locataireMasqueId/modifier', component: LocataireModifierComponent, canActivate: [AuthGuard] },
  { path: 'logements/:logementMasqueId/contact/creer', component: ContactCreerComponent, canActivate: [AuthGuard] },
  { path: 'logements/:logementMasqueId/contact/:contactMasqueId/modifier', component: ContactModifierComponent, canActivate: [AuthGuard] },
  { path: 'logements/:logementMasqueId/photos/modifier', component: PhotosModifierComponent, canActivate: [AuthGuard] },
  { path: 'logements/:logementMasqueId/periode-de-location/creer', component: PeriodeLocationCreerComponent, canActivate: [AuthGuard] },
  { path: 'logements/:logementMasqueId/periode-de-location/:periodeDeLocationMasqueId/modifier', component: PeriodeLocationModifierComponent, canActivate: [AuthGuard] },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [
  ],

  exports: [RouterModule]
})
export class AppRoutingModule {
}
