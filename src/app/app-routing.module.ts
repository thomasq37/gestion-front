import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AppartementItemComponent} from "./components/appartement-item/appartement-item.component";
import {AddAppartementComponent} from "./components/add-appartement/add-appartement.component";
import {UpdateAppartementComponent} from "./components/update-appartement/update-appartement.component";
import {AppartementUpdateFraisComponent} from "./components/appartement-update-frais/appartement-update-frais.component";
import {LoginComponent} from "./components/login/login.component";
import {CreateUserComponent} from "./components/create-user/create-user.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'create', component: CreateUserComponent, pathMatch: 'full'  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'appartement/:id', component: AppartementItemComponent, canActivate: [AuthGuard] },
  { path: 'ajouter-appart', component: AddAppartementComponent, canActivate: [AuthGuard]},
  { path: 'modifier-appart/:id', component: UpdateAppartementComponent, canActivate: [AuthGuard]},
  { path: 'modifier-appart-frais/:id', component: AppartementUpdateFraisComponent, canActivate: [AuthGuard]}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
