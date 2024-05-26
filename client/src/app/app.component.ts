import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  receivedBool: boolean = false;
  /**
   *
   */
  constructor(public readonly authservice: AuthService) {}
  onMyBoolChange(newBool: boolean) {
    this.receivedBool = newBool;
    console.log('Received boolean value from child:', this.receivedBool);
  }
}
