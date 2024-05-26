import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListEmployerComponent } from './list-employer/list-employer.component';
import { EmployerComponent } from './employer/employer.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BaseChartDirective } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

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
  declarations: [ListEmployerComponent, EmployerComponent],
  imports: [
    CommonModule,
    BaseChartDirective,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
  providers: [AuthService],
})
export class EmployersModule {}
