import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {AppartementListComponent} from "./components/appartement-list/appartement-list.component";
import {AppartementItemComponent, CustomDatePipe} from "./components/appartement-item/appartement-item.component";
import {NgbCarouselModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AddAppartementComponent } from './components/add-appartement/add-appartement.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UpdateAppartementComponent } from './components/update-appartement/update-appartement.component';
import { LoginComponent } from './components/login/login.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import {TokenInterceptor} from "./interceptors/token.interceptor";
import {AuthGuard} from "./guards/auth.guard";
import {AppartementContactListComponent} from "./components/appartement-item/appartement-contact/appartement-contact-list/appartement-contact-list.component";
import {AppartementContactManageComponent} from "./components/appartement-item/appartement-contact/appartement-contact-manage/appartement-contact-manage.component";
import {AppartementFraisManageComponent} from "./components/appartement-item/appartement-frais/appartement-frais-manage/appartement-frais-manage.component";
import {AppartementFraisListComponent} from "./components/appartement-item/appartement-frais/appartement-frais-list/appartement-frais-list.component";
import {UnauthorizedComponent} from "./components/unauthorized/unauthorized.component";
import {AppartementContactUpdateComponent} from "./components/appartement-item/appartement-contact/appartement-contact-update/appartement-contact-update.component";
import {AppartementContactAddComponent} from "./components/appartement-item/appartement-contact/appartement-contact-add/appartement-contact-add.component";
import {AppartementFraisAddComponent} from "./components/appartement-item/appartement-frais/appartement-frais-add/appartement-frais-add.component";
import {AppartementFraisUpdateComponent} from "./components/appartement-item/appartement-frais/appartement-frais-update/appartement-frais-update.component";
import {AppartementPeriodeUpdateComponent} from "./components/appartement-item/appartement-periode/appartement-periode-update/appartement-periode-update.component";
import {AppartementPeriodeAddComponent} from "./components/appartement-item/appartement-periode/appartement-periode-add/appartement-periode-add.component";
import {AppartementPeriodeManageComponent} from "./components/appartement-item/appartement-periode/appartement-periode-manage/appartement-periode-manage.component";
import {AppartementPeriodeListComponent} from "./components/appartement-item/appartement-periode/appartement-periode-list/appartement-periode-list.component";
import {AppartementDescElementComponent} from "./components/appartement-item/appartement-desc/appartement-desc-element/appartement-desc-element.component";
import {AppartementPictureElementComponent} from "./components/appartement-item/appartement-picture/appartement-picture-element/appartement-picture-element.component";
import {AppartementMetriqueElementComponent} from "./components/appartement-item/appartement-metrique/appartement-metrique-element/appartement-metrique-element.component";
import { AppartementDescManageComponent } from './components/appartement-item/appartement-desc/appartement-desc-manage/appartement-desc-manage.component';
import { AppartementDescUpdateComponent } from './components/appartement-item/appartement-desc/appartement-desc-update/appartement-desc-update.component';
import { AppartementPictureUpdateComponent } from './components/appartement-item/appartement-picture/appartement-picture-update/appartement-picture-update.component';
import {AppartementPictureManageComponent} from "./components/appartement-item/appartement-picture/appartement-picture-manage/appartement-picture-manage.component";
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AppartementListComponent,
    AppartementItemComponent,
    HeaderComponent,
    FooterComponent,
    AddAppartementComponent,
    UpdateAppartementComponent,
    LoginComponent,
    CreateUserComponent,
    CustomDatePipe,
    AppartementContactListComponent,
    AppartementContactManageComponent,
    AppartementContactAddComponent,
    AppartementContactUpdateComponent,
    UnauthorizedComponent,
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
    AppartementPictureUpdateComponent
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
