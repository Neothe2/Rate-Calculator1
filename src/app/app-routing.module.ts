import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { CalcPageComponent } from './calc-page/calc-page.component';
import { AdminGuard } from './core/admin-gaurd';
import { UserGuard } from './core/user.guard';
import { LoginComponent } from './login/login.component';
import { UserManagementComponent } from './user-management/user-management.component';

const routes: Routes = [
  { path: 'admin', component: AdminPageComponent, canActivate: [AdminGuard] },
  {
    path: 'user-management',
    component: UserManagementComponent,
    canActivate: [AdminGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: '', component: CalcPageComponent, canActivate: [UserGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
