import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListEmployerComponent } from './list-employer/list-employer.component';
import { EmployerComponent } from './employer/employer.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

const routes: Routes = [
  {
    path: '',
    children: [


      { path: 'table', component: ListEmployerComponent },
      { path: ':id', component: EmployerComponent },

    ],
  },
];


@NgModule({
  declarations: [ListEmployerComponent,EmployerComponent],
  imports: [
    CommonModule,
    
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
        RouterModule.forChild(routes),
    
        
  ]
})
export class EmployersModule { }
