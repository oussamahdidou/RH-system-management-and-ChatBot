import { CUSTOM_ELEMENTS_SCHEMA, Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EmployersModule } from './employers/employers.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './not-found/not-found.component';
import { MatIconModule } from '@angular/material/icon';
import {
  BaseChartDirective,
  provideCharts,
  withDefaultRegisterables,
} from 'ng2-charts';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { ChatbootComponent } from './chatboot/chatboot.component';
import { HomenavbarComponent } from './homenavbar/homenavbar.component';
import { DashboardnavbarComponent } from './shared/dashboardnavbar/dashboardnavbar.component';
import { SharedModule } from './shared/shared.module';
import { ListOfferComponent } from './list-offer/list-offer.component';
import { RecrutementService } from './services/recrutement.service';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NotFoundComponent,
    DashboardComponent,
    HomeComponent,
    ChatbootComponent,
    HomenavbarComponent,
    ListOfferComponent,
  ],
  imports: [
    BaseChartDirective,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    EmployersModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideCharts(withDefaultRegisterables()),
    AuthService,
    RecrutementService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
