import { Component, OnInit } from '@angular/core';
import { ChatbootService } from '../services/chatboot.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  output = '';
  ngOnInit(): void {}
  constructor(public readonly authservice: AuthService) {}
}
