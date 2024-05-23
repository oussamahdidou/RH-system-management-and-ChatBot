import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAbscenceComponent } from './list-abscence/list-abscence.component';
import { ListCongesComponent } from './list-conges/list-conges.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    children: [


      { path: '', component: ListAbscenceComponent },
      { path: ':id', component: ListCongesComponent },

    ],
  },
];



@NgModule({
  declarations: [
    ListAbscenceComponent,
    ListCongesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

  ]
})
export class AbscencesModule { }
