import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAbscenceComponent } from './list-abscence/list-abscence.component';
import { ListCongesComponent } from './list-conges/list-conges.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { authGuard } from '../guards/auth.guard';
import { pointeurGuard } from '../guards/pointeur.guard';
import { managerGuard } from '../guards/manager.guard';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PerformanceService } from '../services/performance.service';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'abscences',
        component: ListAbscenceComponent,
        canActivate: [pointeurGuard],
      },
      {
        path: 'conges',
        component: ListCongesComponent,
        canActivate: [managerGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [ListAbscenceComponent, ListCongesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
  ],
  providers: [PerformanceService],
})
export class AbscencesModule {}
