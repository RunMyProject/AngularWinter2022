/*
  *************************************
  * AngularWinter2022                 *
  * for Angular 13.1                  *
  * @Jan / 2022 - by Edoardo Sabatini *
  *************************************
*/
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create mockdata backend
//
import { mockdataBackendProvider } from './services/mockdatahttpinterceptor/mockdatahttpinterceptor.service';

import { AppRoutingModule } from './app-routing.module';
import { JWThttpinterceptorService } from './services/JWThttpinterceptor/jwthttpinterceptor.service';
import { ErrorhttpinterceptorService } from './services/errorhttpinterceptor/errorhttpinterceptor.service';

import { AppComponent } from './app.component';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AlertComponent } from './components/alert/alert.component';
import { ConfirmedComponent } from './components/confirmed/confirmed.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    ConfirmedComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWThttpinterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorhttpinterceptorService,
      multi: true
    },

    // provider used to create mock data backend
    //
    mockdataBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
