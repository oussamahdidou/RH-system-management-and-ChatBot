import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ChatbootService } from '../services/chatboot.service';
import Typed from 'typed.js';
@Component({
  selector: 'app-chatboot',
  templateUrl: './chatboot.component.html',
  styleUrl: './chatboot.component.css',
})
export class ChatbootComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {}
  placdholder = false;
  input = '';
  output = '';
  constructor(private readonly chatbot: ChatbootService) {}
  ngOnInit(): void {}
  search() {
    if (this.input.length > 3) {
      this.output = '';
      this.placdholder = true;
      this.chatbot.chatboot(this.input).subscribe(
        (response) => {
          this.placdholder = false;
          this.output = response.response;
          const options = {
            strings: [this.output],
            typeSpeed: 25,
          };

          const typed = new Typed('#typed-output', options);
          this.input = '';
        },
        (error) => {}
      );
    }
  }
}
