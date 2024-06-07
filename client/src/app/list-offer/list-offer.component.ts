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
  filtreditems: any[] = [];
  ngOnInit(): void {
    this.recrutementservice.getjobs().subscribe(
      (response) => {
        this.items = response;
        this.filtreditems = this.items;
      },
      (error) => {}
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    console.log(filterValue);

    if (filterValue === '') {
      this.filtreditems = [...this.items];
    } else {
      this.filtreditems = this.items.filter((item) => {
        return (
          item.titre.toLowerCase().includes(filterValue) ||
          item.description.toLowerCase().includes(filterValue)
        );
      });
    }
  }
}
