import { Component, OnInit } from '@angular/core';
import { RecrutementService } from '../services/recrutement.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-list-offer',
  templateUrl: './list-offer.component.html',
  styleUrl: './list-offer.component.css',
})
export class ListOfferComponent implements OnInit {
  constructor(
    private readonly recrutementservice: RecrutementService,
    public readonly authservice: AuthService
  ) {}
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
    const filterValue = this.normalizeString(
      (event.target as HTMLInputElement).value.toLowerCase()
    );
    console.log(filterValue);

    if (filterValue === '') {
      this.filtreditems = [...this.items];
    } else {
      this.filtreditems = this.items.filter((item) => {
        return (
          this.normalizeString(item.titre.toLowerCase()).includes(
            filterValue
          ) ||
          this.normalizeString(item.description.toLowerCase()).includes(
            filterValue
          )
        );
      });
    }
  }
  normalizeString(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
}
