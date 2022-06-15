import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire/compat';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { CalcPageComponent } from './calc-page/calc-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { RouterModule, ROUTES } from '@angular/router';
import { AdminGuard } from './core/admin-gaurd';
import { LoginComponent } from './login/login.component';
import { UserGuard } from './core/user.guard';
import { UserManagementComponent } from './user-management/user-management.component';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CalcPageComponent,
    AdminPageComponent,
    LoginComponent,
    UserManagementComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    CommonModule,
  ],
  providers: [AdminGuard, UserGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
