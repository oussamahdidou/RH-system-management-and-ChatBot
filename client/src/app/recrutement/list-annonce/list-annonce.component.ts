import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-annonce',
  templateUrl: './list-annonce.component.html',
  styleUrl: './list-annonce.component.css'
})
export class ListAnnonceComponent implements OnInit {
  displayedColumns: string[] = ['titre', 'nmbrMax', 'date','deadline',  'more'];
  dataSource: MatTableDataSource<any>;

  offers: any[] = [
  { id: '1', titre: 'Offer 1', deadline: new Date('2024-06-01'), nmbrMax: 10, date: new Date('2024-05-01') },
  { id: '2', titre: 'Offer 2', deadline: new Date('2024-07-01'), nmbrMax: 20, date: new Date('2024-05-15') },
  { id: '3', titre: 'Offer 3', deadline: new Date('2024-08-01'), nmbrMax: 15, date: new Date('2024-05-20') },
  { id: '4', titre: 'Offer 4', deadline: new Date('2024-09-01'), nmbrMax: 25, date: new Date('2024-06-01') },
  { id: '5', titre: 'Offer 5', deadline: new Date('2024-10-01'), nmbrMax: 30, date: new Date('2024-06-15') },
  { id: '6', titre: 'Offer 6', deadline: new Date('2024-11-01'), nmbrMax: 5, date: new Date('2024-07-01') },
  { id: '7', titre: 'Offer 7', deadline: new Date('2024-12-01'), nmbrMax: 18, date: new Date('2024-07-15') },
  { id: '8', titre: 'Offer 8', deadline: new Date('2024-06-15'), nmbrMax: 22, date: new Date('2024-05-25') },
  { id: '9', titre: 'Offer 9', deadline: new Date('2024-07-15'), nmbrMax: 12, date: new Date('2024-06-05') },
  { id: '10', titre: 'Offer 10', deadline: new Date('2024-08-15'), nmbrMax: 16, date: new Date('2024-06-20') },
  { id: '11', titre: 'Offer 11', deadline: new Date('2024-09-15'), nmbrMax: 20, date: new Date('2024-07-01') },
  { id: '12', titre: 'Offer 12', deadline: new Date('2024-10-15'), nmbrMax: 25, date: new Date('2024-07-15') },
  { id: '13', titre: 'Offer 13', deadline: new Date('2024-11-15'), nmbrMax: 30, date: new Date('2024-08-01') },
  { id: '14', titre: 'Offer 14', deadline: new Date('2024-12-15'), nmbrMax: 8, date: new Date('2024-08-15') },
  { id: '15', titre: 'Offer 15', deadline: new Date('2025-01-01'), nmbrMax: 10, date: new Date('2024-09-01') }
];


  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource(this.offers);
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}