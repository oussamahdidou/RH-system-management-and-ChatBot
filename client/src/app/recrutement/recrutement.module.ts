import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListAnnonceComponent } from './list-annonce/list-annonce.component';
import { AnnonceComponent } from './annonce/annonce.component';
import { CandidatureComponent } from './candidature/candidature.component';
import { PostuleComponent } from './postule/postule.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

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
PostuleComponent,

  ],
  imports: [
     CommonModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    RouterModule.forChild(routes),
  ]
})
export class RecrutementModule { }
