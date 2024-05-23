import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListAnnonceComponent } from './list-annonce/list-annonce.component';
import { AnnonceComponent } from './annonce/annonce.component';
import { CandidatureComponent } from './candidature/candidature.component';
import { PostuleComponent } from './postule/postule.component';

const routes: Routes = [
  {
    path: '',
    children: [


      { path: 'annonces', component: ListAnnonceComponent },
      { path: 'annonce/:id', component: AnnonceComponent },
      { path: 'candidature/:id', component: CandidatureComponent },
      { path: 'postule/:id', component: PostuleComponent }
    ],
  },
];


@NgModule({
  declarations: [
    
          ListAnnonceComponent,
          AnnonceComponent,
          CandidatureComponent,
          PostuleComponent
  ],
  imports: [
     CommonModule,

    RouterModule.forChild(routes),
  ]
})
export class RecrutementModule { }
