import { Component, OnInit } from '@angular/core';
import { RecrutementService } from '../services/recrutement.service';

@Component({
  selector: 'app-list-offer',
  templateUrl: './list-offer.component.html',
  styleUrl: './list-offer.component.css',
})
export class ListOfferComponent implements OnInit {
  constructor(private readonly recrutementservice: RecrutementService) {}
  items: any[] = [];
  ngOnInit(): void {
    this.recrutementservice.getjobs().subscribe(
      (response) => {
        this.items = response;
      },
      (error) => {}
    );
  }
}
