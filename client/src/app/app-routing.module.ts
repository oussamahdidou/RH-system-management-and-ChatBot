import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  //  {
  //       path: '',
  //       component: HomeComponent,
  //       pathMatch: 'full',
  //   },

    {
        path: 'abscence',
        loadChildren: () => import('./abscences/abscences.module').then((m) => m.AbscencesModule),
    },
    {
        path: 'employers',
        loadChildren: () => import('./employers/employers.module').then((m) => m.EmployersModule),
    },
    {
        path: 'recrutement',
        loadChildren: () => import('./recrutement/recrutement.module').then((m) => m.RecrutementModule),
    },
    {path: '**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
