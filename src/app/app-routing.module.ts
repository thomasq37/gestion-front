import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AppartementItemComponent} from "./components/appartement-item/appartement-item.component";
import {AddAppartementComponent} from "./components/add-appartement/add-appartement.component";
import {UpdateAppartementComponent} from "./components/update-appartement/update-appartement.component";
import {AppartementUpdateFraisComponent} from "./components/appartement-update-frais/appartement-update-frais.component";
import {LoginComponent} from "./components/login/login.component";
import {CreateUserComponent} from "./components/create-user/create-user.component";

const routes: Routes = [
  { path: '', redirectTo: '/login',pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'create', component: CreateUserComponent, pathMatch: 'full'  },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'appartement/:id', component: AppartementItemComponent },
  { path: 'ajouter-appart', component: AddAppartementComponent},
  { path: 'modifier-appart/:id', component: UpdateAppartementComponent},
  { path: 'modifier-appart-frais/:id', component: AppartementUpdateFraisComponent}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
