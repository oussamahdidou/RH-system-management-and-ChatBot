import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListEmployerComponent } from './list-employer/list-employer.component';
import { EmployerComponent } from './employer/employer.component';
const routes: Routes = [
  {
    path: '',
    children: [


      { path: '', component: ListEmployerComponent },
      { path: ':id', component: EmployerComponent },

    ],
  },
];


@NgModule({
  declarations: [ListEmployerComponent,EmployerComponent],
  imports: [
    CommonModule,
        RouterModule.forChild(routes),
  ]
})
export class EmployersModule { }
