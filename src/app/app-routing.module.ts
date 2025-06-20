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
import {AlerteCreerComponent} from "./components/v2/alerte/alerte-creer/alerte-creer.component";
import {AlerteModifierComponent} from "./components/v2/alerte/alerte-modifier/alerte-modifier.component";
import {DocumentCreerComponent} from "./components/v2/document/document-creer/document-creer.component";
import {CreditCreerComponent} from "./components/v2/credit/credit-creer/credit-creer.component";
import {CreditModifierComponent} from "./components/v2/credit/credit-modifier/credit-modifier.component";
import {
  PlacementVueEnsembleComponent
} from "./components/v2/placements/placement-vue-ensemble/placement-vue-ensemble.component";
import {OutilsVueEnsembleComponent} from "./components/v2/outils/outils-vue-ensemble/outils-vue-ensemble.component";
import {
  OutilCapaciteEmpruntComponent
} from "./components/v2/outils/outil-capacite-emprunt/outil-capacite-emprunt.component";
import {PlacementCreerComponent} from "./components/v2/placements/placement-creer/placement-creer.component";
import {PlacementModifierComponent} from "./components/v2/placements/placement-modifier/placement-modifier.component";
import {
  TotalCompteModifierComponent
} from "./components/v2/placements/total-compte-modifier/total-compte-modifier.component";


const routes: Routes = [
  { path: '', redirectTo: 'logements', pathMatch: 'full' }, // Route par défaut
  { path: 'logements', component: LogementsComponent, canActivate: [AuthGuard] },
  { path: 'connexion', component: ConnexionComponent, canActivate: [AlreadyAuthGuard] },
  { path: 'inscription', component: InscriptionComponent, canActivate: [AlreadyAuthGuard] },
  { path: 'logements/:logementMasqueId', component: LogementComponent, canActivate: [AuthGuard] },
  { path: 'logements/:logementMasqueId/adresse/creer', component: AdresseCreerComponent, canActivate: [AuthGuard] },
  { path: 'logements/:logementMasqueId/adresse/modifier', component: AdresseModifierComponent, canActivate: [AuthGuard] },
  { path: 'logements/:logementMasqueId/caracteristiques/creer', component: CaracteristiquesCreerComponent, canActivate: [AuthGuard] },
  { path: 'logements/:logementMasqueId/caracteristiques/modifier', component: CaracteristiquesModifierComponent, canActivate: [AuthGuard] },
  { path: 'logements/:logementMasqueId/credit/creer', component: CreditCreerComponent, canActivate: [AuthGuard] },
  { path: 'logements/:logementMasqueId/credit/modifier', component: CreditModifierComponent, canActivate: [AuthGuard] },
  { path: 'logements/:logementMasqueId/locataire/creer', component: LocataireCreerComponent, canActivate: [AuthGuard] },
  { path: 'logements/:logementMasqueId/locataire/:locataireMasqueId/modifier', component: LocataireModifierComponent, canActivate: [AuthGuard] },
  { path: 'logements/:logementMasqueId/contact/creer', component: ContactCreerComponent, canActivate: [AuthGuard] },
  { path: 'logements/:logementMasqueId/contact/:contactMasqueId/modifier', component: ContactModifierComponent, canActivate: [AuthGuard] },
  { path: 'logements/:logementMasqueId/photos/modifier', component: PhotosModifierComponent, canActivate: [AuthGuard] },
  { path: 'logements/:logementMasqueId/periode-de-location/creer', component: PeriodeLocationCreerComponent, canActivate: [AuthGuard] },
  { path: 'logements/:logementMasqueId/periode-de-location/:periodeDeLocationMasqueId/modifier', component: PeriodeLocationModifierComponent, canActivate: [AuthGuard] },
  { path: 'logements/:logementMasqueId/frais/creer', component: FraisCreerComponent, canActivate: [AuthGuard] },
  { path: 'logements/:logementMasqueId/frais/:fraisMasqueId/modifier', component: FraisModifierComponent, canActivate: [AuthGuard] },
  { path: 'logements/:logementMasqueId/alerte/creer', component: AlerteCreerComponent, canActivate: [AuthGuard] },
  { path: 'logements/:logementMasqueId/alerte/:alerteMasqueId/modifier', component: AlerteModifierComponent, canActivate: [AuthGuard] },
  { path: 'logements/:logementMasqueId/document/creer', component: DocumentCreerComponent, canActivate: [AuthGuard] },

  { path: 'placements', component: PlacementVueEnsembleComponent, canActivate: [AuthGuard] },
  { path: 'placements/creer', component: PlacementCreerComponent, canActivate: [AuthGuard] },
  { path: 'placements/:placementMasqueId/modifier', component: PlacementModifierComponent, canActivate: [AuthGuard] },

  { path: 'outils', component: OutilsVueEnsembleComponent, canActivate: [AuthGuard] },
  { path: 'outils/ma-capacite-emprunt', component: OutilCapaciteEmpruntComponent, canActivate: [AuthGuard] },
  { path: 'placements/total-compte/:masqueId/modifier', component: TotalCompteModifierComponent, canActivate: [AuthGuard] },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [
  ],

  exports: [RouterModule]
})
export class AppRoutingModule {
}
