import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  receivedBool: boolean = false;
  /**
   *
   */
  showComponent: boolean = true;
  constructor(
    public readonly authservice: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showComponent = !(
          event.url === '/auth/login' ||
          event.url === '/' ||
          event.url === '/AI'
        );
      }
    });
  }

  onMyBoolChange(newBool: boolean) {
    this.receivedBool = newBool;
    console.log('Received boolean value from child:', this.receivedBool);
  }
}
