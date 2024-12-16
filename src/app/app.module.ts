import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {AppartementListComponent} from "./components/appartement/appartement-list/appartement-list.component";
import {AppartementItemComponent, CustomDatePipe} from "./components/appartement/appartement-item/appartement-item.component";
import {NgbCarouselModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './components/footer/footer.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthGuard} from "./guards/auth.guard";
import {AppartementContactListComponent} from "./components/appartement/appartement-item/appartement-contact/appartement-contact-list/appartement-contact-list.component";
import {AppartementContactManageComponent} from "./components/appartement/appartement-item/appartement-contact/appartement-contact-manage/appartement-contact-manage.component";
import {AppartementFraisManageComponent} from "./components/appartement/appartement-item/appartement-frais/appartement-frais-manage/appartement-frais-manage.component";
import {AppartementFraisListComponent} from "./components/appartement/appartement-item/appartement-frais/appartement-frais-list/appartement-frais-list.component";
import {AppartementContactUpdateComponent} from "./components/appartement/appartement-item/appartement-contact/appartement-contact-update/appartement-contact-update.component";
import {AppartementContactAddComponent} from "./components/appartement/appartement-item/appartement-contact/appartement-contact-add/appartement-contact-add.component";
import {AppartementFraisAddComponent} from "./components/appartement/appartement-item/appartement-frais/appartement-frais-add/appartement-frais-add.component";
import {AppartementFraisUpdateComponent} from "./components/appartement/appartement-item/appartement-frais/appartement-frais-update/appartement-frais-update.component";
import {AppartementPeriodeUpdateComponent} from "./components/appartement/appartement-item/appartement-periode/appartement-periode-update/appartement-periode-update.component";
import {AppartementPeriodeAddComponent} from "./components/appartement/appartement-item/appartement-periode/appartement-periode-add/appartement-periode-add.component";
import {AppartementPeriodeManageComponent} from "./components/appartement/appartement-item/appartement-periode/appartement-periode-manage/appartement-periode-manage.component";
import {AppartementPeriodeListComponent} from "./components/appartement/appartement-item/appartement-periode/appartement-periode-list/appartement-periode-list.component";
import {AppartementDescElementComponent} from "./components/appartement/appartement-item/appartement-desc/appartement-desc-element/appartement-desc-element.component";
import {AppartementPictureElementComponent} from "./components/appartement/appartement-item/appartement-picture/appartement-picture-element/appartement-picture-element.component";
import {AppartementMetriqueElementComponent} from "./components/appartement/appartement-item/appartement-metrique/appartement-metrique-element/appartement-metrique-element.component";
import { AppartementDescManageComponent } from './components/appartement/appartement-item/appartement-desc/appartement-desc-manage/appartement-desc-manage.component';
import { AppartementDescUpdateComponent } from './components/appartement/appartement-item/appartement-desc/appartement-desc-update/appartement-desc-update.component';
import { AppartementPictureUpdateComponent } from './components/appartement/appartement-item/appartement-picture/appartement-picture-update/appartement-picture-update.component';
import {AppartementPictureManageComponent} from "./components/appartement/appartement-item/appartement-picture/appartement-picture-manage/appartement-picture-manage.component";
import { AppartementAddComponent } from './components/appartement/appartement-add/appartement-add.component';
import { UtilisateurAddComponent } from './components/utilisateur/utilisateur-add/utilisateur-add.component';
import { UtilisateurLoginComponent } from './components/utilisateur/utilisateur-login/utilisateur-login.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import {NgOptimizedImage, registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { LOCALE_ID } from '@angular/core';
import { ConfirmationDialogComponent } from './components/util/confirmation-dialog/confirmation-dialog.component';
import { AuthComponent } from './components/auth/auth/auth.component';
import {AppRoutingModule} from "./app-routing.module";
import { LogementsComponent } from './components/v2/logements/logements.component';
import { ConnexionComponent } from './components/v2/connexion/connexion.component';
import { InscriptionComponent } from './components/v2/inscription/inscription.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxIntlTelInputModule} from "ngx-intl-tel-input-gg";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import { LogementComponent } from './components/v2/logement/logement.component';
import { DeconnexionComponent } from './components/v2/commun/deconnexion/deconnexion.component';
import {HeaderComponent} from "./components/v2/commun/header/header.component";
import { LoaderComponent } from './components/v2/commun/loader/loader.component';
import { PhotoCarousselComponent } from './components/v2/photo/photo-caroussel/photo-caroussel.component';
import { AdresseElementComponent } from './components/v2/adresse/adresse-element/adresse-element.component';
import { CaracteristiquesElementComponent } from './components/v2/caracteristiques/caracteristiques-element/caracteristiques-element.component';
import { PropTableComponent } from './components/v2/commun/prop-table/prop-table.component';
import { FraisTableComponent } from './components/v2/frais/frais-table/frais-table.component';
import { PeriodeLocationTableComponent } from './components/v2/periode-location/periode-location-table/periode-location-table.component';
import {ContactTableComponent} from "./components/v2/contact/contact-table/contact-table.component";
import { LocataireTableComponent } from './components/v2/locataire/locataire-table/locataire-table.component';
import { AdresseCreerComponent } from './components/v2/adresse/adresse-creer/adresse-creer.component';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AppartementListComponent,
    AppartementItemComponent,
    HeaderComponent,
    FooterComponent,
    CustomDatePipe,
    AppartementContactListComponent,
    AppartementContactManageComponent,
    AppartementContactAddComponent,
    AppartementContactUpdateComponent,
    AppartementFraisListComponent,
    AppartementFraisManageComponent,
    AppartementFraisAddComponent,
    AppartementFraisUpdateComponent,
    AppartementPeriodeListComponent,
    AppartementPeriodeManageComponent,
    AppartementPeriodeAddComponent,
    AppartementPeriodeUpdateComponent,
    AppartementDescElementComponent,
    AppartementPictureElementComponent,
    AppartementMetriqueElementComponent,
    AppartementPictureManageComponent,
    AppartementDescManageComponent,
    AppartementDescUpdateComponent,
    AppartementPictureUpdateComponent,
    AppartementAddComponent,
    UtilisateurAddComponent,
    UtilisateurLoginComponent,
    PaginationComponent,
    ConfirmationDialogComponent,
    AuthComponent,
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
    BsDropdownModule.forRoot() // Import de BsDropdownModule
  ],
    providers: [
        AuthGuard,
        { provide: LOCALE_ID, useValue: 'fr' }
    ],
    exports: [
        UtilisateurLoginComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
