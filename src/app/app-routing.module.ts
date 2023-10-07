import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AppartementItemComponent} from "./components/appartement-item/appartement-item.component";
import {AddAppartementComponent} from "./components/add-appartement/add-appartement.component";
import {LoginComponent} from "./components/login/login.component";
import {CreateUserComponent} from "./components/create-user/create-user.component";
import {AuthGuard} from "./guards/auth.guard";
import {AppartementPeriodeManageComponent} from "./components/appartement-item/appartement-periode/appartement-periode-manage/appartement-periode-manage.component";
import {AppartementContactManageComponent} from "./components/appartement-item/appartement-contact/appartement-contact-manage/appartement-contact-manage.component";
import {AppartementFraisManageComponent} from "./components/appartement-item/appartement-frais/appartement-frais-manage/appartement-frais-manage.component";
import {AppartementDescManageComponent} from "./components/appartement-item/appartement-desc/appartement-desc-manage/appartement-desc-manage.component";
import {AppartementPictureManageComponent} from "./components/appartement-item/appartement-picture/appartement-picture-manage/appartement-picture-manage.component";

const routes: Routes = [

  // Home

  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

  // Registration

  { path: 'login', component: LoginComponent },
  { path: 'create', component: CreateUserComponent, pathMatch: 'full'  },


  { path: 'appartement/:id', component: AppartementItemComponent, canActivate: [AuthGuard] },
  { path: 'appartements/add', component: AddAppartementComponent, canActivate: [AuthGuard]},

  // Manage

  { path: 'appartement/:id/periodes', component: AppartementPeriodeManageComponent, canActivate: [AuthGuard] },
  { path: 'appartement/:id/contacts', component: AppartementContactManageComponent, canActivate: [AuthGuard] },
  { path: 'appartement/:id/frais', component: AppartementFraisManageComponent, canActivate: [AuthGuard] },
  { path: 'appartement/:id/description', component: AppartementDescManageComponent, canActivate: [AuthGuard] },
  { path: 'appartement/:id/photos', component: AppartementPictureManageComponent, canActivate: [AuthGuard] },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
