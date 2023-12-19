import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {AppartementListComponent} from "./components/appartement/appartement-list/appartement-list.component";
import {AppartementItemComponent, CustomDatePipe} from "./components/appartement/appartement-item/appartement-item.component";
import {NgbCarouselModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TokenInterceptor} from "./interceptors/token.interceptor";
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
import { AppartementGestionnaireManageComponent } from './components/appartement/appartement-item/appartement-gestionnaire/appartement-gestionnaire-manage/appartement-gestionnaire-manage.component';
import { AppartementGestionnaireAddComponent } from './components/appartement/appartement-item/appartement-gestionnaire/appartement-gestionnaire-add/appartement-gestionnaire-add.component';
import { AppartementGestionnaireListComponent } from './components/appartement/appartement-item/appartement-gestionnaire/appartement-gestionnaire-list/appartement-gestionnaire-list.component';
import { AppartementGestionnaireUpdateComponent } from './components/appartement/appartement-item/appartement-gestionnaire/appartement-gestionnaire-update/appartement-gestionnaire-update.component';
import { PaginationComponent } from './components/pagination/pagination.component';
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
    AppartementGestionnaireManageComponent,
    AppartementGestionnaireAddComponent,
    AppartementGestionnaireListComponent,
    AppartementGestionnaireUpdateComponent,
    PaginationComponent
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
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
