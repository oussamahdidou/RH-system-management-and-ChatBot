import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardnavbarComponent } from './dashboardnavbar/dashboardnavbar.component';

@NgModule({
  declarations: [DashboardnavbarComponent],
  imports: [CommonModule],
  exports: [DashboardnavbarComponent],
})
export class SharedModule {}
