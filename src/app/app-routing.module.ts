/*
  *************************************
  * AngularWinter2022                 *
  * for Angular 13.1                  *
  * @Jan / 2022 - by Edoardo Sabatini *
  *************************************
*/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ConfirmedComponent } from './components/confirmed/confirmed.component';
import { AuthcanactivateService } from './services/authcanactivate/authcanactivate.service';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [AuthcanactivateService]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'confirmed', component: ConfirmedComponent },
  { path: 'admin', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },

  // Otherwise redirect to home
  //
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const appRoutingModule = RouterModule.forRoot(routes,
  {
    useHash: true
});
