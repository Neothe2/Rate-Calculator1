import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { CalcPageComponent } from './calc-page/calc-page.component';
import { AdminGuard } from './core/admin-gaurd';
import { UserGuard } from './core/user.guard';
import { LiftCalcComponent } from './lift-calc/lift-calc.component';
import { LoginComponent } from './login/login.component';
import { UserManagementComponent } from './user-management/user-management.component';

const routes: Routes = [
  { path: 'admin', component: AdminPageComponent, canActivate: [AdminGuard] },
  {
    path: 'user-management',
    component: UserManagementComponent,
    canActivate: [AdminGuard],
  },
  { path: 'panel-calculator', component: CalcPageComponent },
  { path: 'lift-calculator', component: LiftCalcComponent, canActivate: [UserGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', component: CalcPageComponent, canActivate: [UserGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
