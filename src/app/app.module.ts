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
import { AppartementUpdateFraisComponent } from './components/appartement-update-frais/appartement-update-frais.component';
import { LoginComponent } from './components/login/login.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import {TokenInterceptor} from "./interceptors/token.interceptor";
import {AuthGuard} from "./guards/auth.guard";
import { AppartementUpdatePeriodesComponent } from './components/appartement-update-periodes/appartement-update-periodes.component';
import { AppartementContactListComponent } from './components/appartement-contact-list/appartement-contact-list.component';
import { AppartementContactManageComponent } from './components/appartement-contact-manage/appartement-contact-manage.component';
import { AppartementContactAddComponent } from './components/appartement-contact-add/appartement-contact-add.component';
import { AppartementContactUpdateComponent } from './components/appartement-contact-update/appartement-contact-update.component';
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
    AppartementUpdateFraisComponent,
    LoginComponent,
    CreateUserComponent,
    CustomDatePipe,
    AppartementUpdatePeriodesComponent,
    AppartementContactListComponent,
    AppartementContactManageComponent,
    AppartementContactAddComponent,
    AppartementContactUpdateComponent
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
