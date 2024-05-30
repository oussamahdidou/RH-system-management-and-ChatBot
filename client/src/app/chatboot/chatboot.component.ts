import { Component, OnInit } from '@angular/core';
import { ChatbootService } from '../services/chatboot.service';

@Component({
  selector: 'app-chatboot',
  templateUrl: './chatboot.component.html',
  styleUrl: './chatboot.component.css',
})
export class ChatbootComponent implements OnInit {
  input = '';
  output = '';
  constructor(private readonly chatbot: ChatbootService) {}
  ngOnInit(): void {}
  search() {
    if (this.input.length > 3) {
      console.log(this.input);
      this.chatbot.chatboot(this.input).subscribe(
        (response) => {
          console.log(response);
          this.output = response.response;
        },
        (error) => {}
      );
    }
  }
}
