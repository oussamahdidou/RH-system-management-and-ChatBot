import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboardnavbar',
  templateUrl: './dashboardnavbar.component.html',
  styleUrl: './dashboardnavbar.component.css',
})
export class DashboardnavbarComponent {
  constructor(
    private readonly authservice: AuthService,
    private readonly router: Router
  ) {}
  gotoprofile() {
    const id = this.authservice.getuserid();
    this.router.navigate([`/employers/${id}`]);
  }
  logout() {
    this.authservice.logout();
    this.router.navigate([`/`]);
  }
}
