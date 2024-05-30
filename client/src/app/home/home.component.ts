import { Component, OnInit } from '@angular/core';
import { ChatbootService } from '../services/chatboot.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  output = '';
  constructor(private readonly chatbot: ChatbootService) {}
  ngOnInit(): void {
    this.chatbot.chatboot('how i can apply for a job').subscribe(
      (response) => {
        console.log(response);
        this.output = response.response;
      },
      (error) => {}
    );
  }
}
