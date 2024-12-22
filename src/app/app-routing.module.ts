import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";
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
import {FraisModifierComponent} from "./components/v2/frais/frais-modifier/frais-modifier.component";
import {FraisCreerComponent} from "./components/v2/frais/frais-creer/frais-creer.component";


const routes: Routes = [
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
  { path: 'logements/:logementMasqueId/frais/creer', component: FraisCreerComponent, canActivate: [AuthGuard] },
  { path: 'logements/:logementMasqueId/frais/:fraisMasqueId/modifier', component: FraisModifierComponent, canActivate: [AuthGuard] },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [
  ],

  exports: [RouterModule]
})
export class AppRoutingModule {
}
