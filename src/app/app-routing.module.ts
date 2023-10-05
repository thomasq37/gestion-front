import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AppartementItemComponent} from "./components/appartement-item/appartement-item.component";
import {AddAppartementComponent} from "./components/add-appartement/add-appartement.component";
import {UpdateAppartementComponent} from "./components/update-appartement/update-appartement.component";
import {LoginComponent} from "./components/login/login.component";
import {CreateUserComponent} from "./components/create-user/create-user.component";
import {AuthGuard} from "./guards/auth.guard";
import {AppartementContactManageComponent} from "./components/appartement-contact/appartement-contact-manage/appartement-contact-manage.component";
import {UnauthorizedComponent} from "./components/unauthorized/unauthorized.component";
import {AppartementFraisManageComponent} from "./components/appartement-frais/appartement-frais-manage/appartement-frais-manage.component";
import {AppartementPeriodeManageComponent} from "./components/appartement-periode/appartement-periode-manage/appartement-periode-manage.component";

const routes: Routes = [

  // Home

  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

  // Registration

  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create', component: CreateUserComponent, pathMatch: 'full'  },


  { path: 'appartement/:id', component: AppartementItemComponent, canActivate: [AuthGuard] },
  { path: 'ajouter-appart', component: AddAppartementComponent, canActivate: [AuthGuard]},

  // Manage

  { path: 'appartement/:id/periodes', component: AppartementPeriodeManageComponent, canActivate: [AuthGuard] },
  { path: 'appartement/:id/contacts', component: AppartementContactManageComponent, canActivate: [AuthGuard] },
  { path: 'appartement/:id/frais', component: AppartementFraisManageComponent, canActivate: [AuthGuard] },

  { path: 'modifier-appart/:id', component: UpdateAppartementComponent, canActivate: [AuthGuard]},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
