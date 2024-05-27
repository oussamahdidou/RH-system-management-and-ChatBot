import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './guards/auth.guard';
import { rhserviceGuard } from './guards/rhservice.guard';
import { recruteurGuard } from './guards/recruteur.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch: 'full',
    canActivate: [rhserviceGuard],
  },
  {
    path: 'abscence',
    loadChildren: () =>
      import('./abscences/abscences.module').then((m) => m.AbscencesModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'employers',
    loadChildren: () =>
      import('./employers/employers.module').then((m) => m.EmployersModule),
    canActivate: [rhserviceGuard],
  },
  {
    path: 'recrutement',
    loadChildren: () =>
      import('./recrutement/recrutement.module').then(
        (m) => m.RecrutementModule
      ),
    canActivate: [recruteurGuard],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
