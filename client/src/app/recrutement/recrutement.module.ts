import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnonceComponent } from './annonce/annonce.component';
import { ListAnnonceComponent } from './list-annonce/list-annonce.component';
import { CandidatureComponent } from './candidature/candidature.component';
import { CandidatureUrgentComponent } from './candidature-urgent/candidature-urgent.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    children: [

      { path: 'annonces', component: ListAnnonceComponent },
      { path: 'annonces/:id', component: AnnonceComponent },
      { path: 'candidature/:id', component: CandidatureComponent },
      { path: 'candidatureurgent/:id', component: CandidatureUrgentComponent }
    ],
  },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class RecrutementModule { }
