import localeFr from '@angular/common/locales/fr';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthGuard } from "./guards/auth.guard";
import { PaginationComponent } from './components/v2/pagination/pagination.component';
import { NgOptimizedImage, registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from "./app-routing.module";
import { LogementsComponent } from './components/v2/logements/logements.component';
import { ConnexionComponent } from './components/v2/connexion/connexion.component';
import { InscriptionComponent } from './components/v2/inscription/inscription.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxIntlTelInputModule } from "ngx-intl-tel-input-gg";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { LogementComponent } from './components/v2/logement/logement.component';
import { DeconnexionComponent } from './components/v2/commun/deconnexion/deconnexion.component';
import { HeaderComponent } from "./components/v2/commun/header/header.component";
import { LoaderComponent } from './components/v2/commun/loader/loader.component';
import { PhotoCarousselComponent } from './components/v2/photo/photo-caroussel/photo-caroussel.component';
import { AdresseElementComponent } from './components/v2/adresse/adresse-element/adresse-element.component';
import { CaracteristiquesElementComponent } from './components/v2/caracteristiques/caracteristiques-element/caracteristiques-element.component';
import { PropTableComponent } from './components/v2/commun/prop-table/prop-table.component';
import { FraisTableComponent } from './components/v2/frais/frais-table/frais-table.component';
import { PeriodeLocationTableComponent } from './components/v2/periode-location/periode-location-table/periode-location-table.component';
import { ContactTableComponent } from "./components/v2/contact/contact-table/contact-table.component";
import { LocataireTableComponent } from './components/v2/locataire/locataire-table/locataire-table.component';
import { AdresseCreerComponent } from './components/v2/adresse/adresse-creer/adresse-creer.component';
import { AdresseModifierComponent } from './components/v2/adresse/adresse-modifier/adresse-modifier.component';
import { CaracteristiquesCreerComponent } from './components/v2/caracteristiques/caracteristiques-creer/caracteristiques-creer.component';
import { CaracteristiquesModifierComponent } from './components/v2/caracteristiques/caracteristiques-modifier/caracteristiques-modifier.component';
import { LocataireCreerComponent } from './components/v2/locataire/locataire-creer/locataire-creer.component';
import { LocataireModifierComponent } from './components/v2/locataire/locataire-modifier/locataire-modifier.component';
import { ContactCreerComponent } from './components/v2/contact/contact-creer/contact-creer.component';
import { ContactModifierComponent } from './components/v2/contact/contact-modifier/contact-modifier.component';
import { PhotosModifierComponent } from './components/v2/photo/photos-modifier/photos-modifier.component';
import { PeriodeLocationCreerComponent } from './components/v2/periode-location/periode-location-creer/periode-location-creer.component';
import { PeriodeLocationModifierComponent } from './components/v2/periode-location/periode-location-modifier/periode-location-modifier.component';
import { FraisModifierComponent } from './components/v2/frais/frais-modifier/frais-modifier.component';
import { FraisCreerComponent } from './components/v2/frais/frais-creer/frais-creer.component';
import { CustomDatePipe } from "./components/v2/util/custom-date-pipe";
import { FilArianeComponent } from './components/v2/fil-ariane/fil-ariane.component';
import { AlerteCreerComponent } from './components/v2/alerte/alerte-creer/alerte-creer.component';
import { AlerteTableComponent } from './components/v2/alerte/alerte-table/alerte-table.component';
import { AlerteModifierComponent } from './components/v2/alerte/alerte-modifier/alerte-modifier.component';
import { AlerteElementComponent } from './components/v2/alerte/alerte-element/alerte-element.component';
import { StatistiquesComponent } from './components/v2/statistiques/statistiques.component';
import { DocumentTableComponent } from './components/v2/document/document-table/document-table.component';
import { DocumentCreerComponent } from './components/v2/document/document-creer/document-creer.component';
import {ModaleConfirmationComponent} from "./components/v2/modale-confirmation/modale-confirmation.component";
import { ReservationsComponent } from './components/v2/airbnb/reservations/reservations.component';
import { CreditCreerComponent } from './components/v2/credit/credit-creer/credit-creer.component';
import { CreditElementComponent } from './components/v2/credit/credit-element/credit-element.component';
import { CreditModifierComponent } from './components/v2/credit/credit-modifier/credit-modifier.component';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CustomDatePipe,
    PaginationComponent,
    LogementsComponent,
    ConnexionComponent,
    InscriptionComponent,
    LogementComponent,
    DeconnexionComponent,
    HeaderComponent,
    LoaderComponent,
    PhotoCarousselComponent,
    AdresseElementComponent,
    CaracteristiquesElementComponent,
    PropTableComponent,
    FraisTableComponent,
    PeriodeLocationTableComponent,
    ContactTableComponent,
    LocataireTableComponent,
    AdresseCreerComponent,
    AdresseModifierComponent,
    CaracteristiquesCreerComponent,
    CaracteristiquesModifierComponent,
    LocataireCreerComponent,
    LocataireModifierComponent,
    ContactCreerComponent,
    ContactModifierComponent,
    PhotosModifierComponent,
    PeriodeLocationCreerComponent,
    PeriodeLocationModifierComponent,
    FraisModifierComponent,
    FraisCreerComponent,
    FilArianeComponent,
    AlerteCreerComponent,
    AlerteTableComponent,
    AlerteModifierComponent,
    AlerteElementComponent,
    StatistiquesComponent,
    DocumentTableComponent,
    DocumentCreerComponent,
    ModaleConfirmationComponent,
    ReservationsComponent,
    CreditCreerComponent,
    CreditElementComponent,
    CreditModifierComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgbCarouselModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    BrowserAnimationsModule,
    NgxIntlTelInputModule,
    BsDropdownModule.forRoot()
  ],
    providers: [
        AuthGuard,
        { provide: LOCALE_ID, useValue: 'fr' }
    ],
    exports: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
