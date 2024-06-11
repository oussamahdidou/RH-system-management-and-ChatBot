import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './guards/auth.guard';
import { rhserviceGuard } from './guards/rhservice.guard';
import { recruteurGuard } from './guards/recruteur.guard';
import { ChatbootComponent } from './chatboot/chatboot.component';
import { ListOfferComponent } from './list-offer/list-offer.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'AI',
    component: ChatbootComponent,
    pathMatch: 'full',
  },
  {
    path: 'offers',
    component: ListOfferComponent,
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
  },
  {
    path: 'recrutement',
    loadChildren: () =>
      import('./recrutement/recrutement.module').then(
        (m) => m.RecrutementModule
      ),
  },
  { path: '**', component: NotFoundComponent },
];
const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled', // Enable anchor scrolling
  scrollPositionRestoration: 'enabled', // Optional: Restores scroll position on navigation
};
@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
