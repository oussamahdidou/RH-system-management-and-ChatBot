import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListEmployersComponent } from './list-employers/list-employers.component';
import { DetailEmployerComponent } from './detail-employer/detail-employer.component';
const routes: Routes = [
  {
    path: '',
    children: [

      { path: '', component: ListEmployersComponent },
      { path: ':id', component: DetailEmployerComponent },

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
export class EmployersModule { }
