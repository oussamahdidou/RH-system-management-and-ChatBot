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

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showComponent = !(
          this.isAuthRoute(event.url) ||
          this.isHomeRoute(event.url) ||
          this.isAIRoute(event.url) ||
          this.isPostuleRoute(event.url) ||
          event.url === '/offers'
        );
      }
    });
  }

  private isAuthRoute(url: string): boolean {
    return url.startsWith('/auth');
  }
  private isPostuleRoute(url: string): Boolean {
    return url.startsWith('/recrutement/postule');
  }
  private isHomeRoute(url: string): boolean {
    return url === '/' || url.startsWith('/#');
  }
  private isAIRoute(url: string): boolean {
    return url === '/AI' || url.startsWith('/AI#');
  }
  onMyBoolChange(newBool: boolean) {
    this.receivedBool = newBool;
    console.log('Received boolean value from child:', this.receivedBool);
  }
}
