import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  receivedBool: boolean = false;

  onMyBoolChange(newBool: boolean) {
    this.receivedBool = newBool;
    console.log('Received boolean value from child:', this.receivedBool);
  }
}
