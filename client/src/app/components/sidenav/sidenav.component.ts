import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  isOpen = false;
ToggleOpen() {
this.isOpen= !this.isOpen;
}

 
}
