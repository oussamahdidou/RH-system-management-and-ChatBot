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
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'abscences',
        component: ListAbscenceComponent,
      },
      { path: 'conges', component: ListCongesComponent },
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
  ],
})
export class AbscencesModule {}
