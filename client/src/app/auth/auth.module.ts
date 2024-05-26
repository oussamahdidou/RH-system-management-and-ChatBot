import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
const routes: Routes = [
  {
    path: '',
    children: [{ path: 'login', component: LoginComponent }],
  },
];

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule],
  providers: [AuthService],
})
export class AuthModule {}
