import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListEmployerComponent } from './list-employer/list-employer.component';
import { EmployerComponent } from './employer/employer.component';
import { FormsModule } from '@angular/forms';
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
    FormsModule,
        RouterModule.forChild(routes),
        
  ]
})
export class EmployersModule { }
