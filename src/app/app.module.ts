import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {AppartementListComponent} from "./components/appartement-list/appartement-list.component";
import {AppartementItemComponent} from "./components/appartement-item/appartement-item.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AddAppartementComponent } from './components/add-appartement/add-appartement.component';
import {FormsModule} from "@angular/forms";
import { UpdateAppartementComponent } from './components/update-appartement/update-appartement.component';
import { AppartementUpdateFraisComponent } from './components/appartement-update-frais/appartement-update-frais.component';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
