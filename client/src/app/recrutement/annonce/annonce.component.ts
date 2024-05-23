import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrl: './annonce.component.css'
})
export class AnnonceComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'phone',  'more'];
  dataSource: MatTableDataSource<any>;

  offers: any[] =[
  { id: '1', titre: 'Element 1', email: 'element1@example.com', phone: '123-456-7890' },
  { id: '2', titre: 'Element 2', email: 'element2@example.com', phone: '234-567-8901' },
  { id: '3', titre: 'Element 3', email: 'element3@example.com', phone: '345-678-9012' },
  { id: '4', titre: 'Element 4', email: 'element4@example.com', phone: '456-789-0123' },
  { id: '5', titre: 'Element 5', email: 'element5@example.com', phone: '567-890-1234' },
  { id: '6', titre: 'Element 6', email: 'element6@example.com', phone: '678-901-2345' },
  { id: '7', titre: 'Element 7', email: 'element7@example.com', phone: '789-012-3456' },
  { id: '8', titre: 'Element 8', email: 'element8@example.com', phone: '890-123-4567' },
  { id: '9', titre: 'Element 9', email: 'element9@example.com', phone: '901-234-5678' },
  { id: '10', titre: 'Element 10', email: 'element10@example.com', phone: '012-345-6789' },
  { id: '11', titre: 'Element 11', email: 'element11@example.com', phone: '123-456-7891' },
  { id: '12', titre: 'Element 12', email: 'element12@example.com', phone: '234-567-8902' },
  { id: '13', titre: 'Element 13', email: 'element13@example.com', phone: '345-678-9013' },
  { id: '14', titre: 'Element 14', email: 'element14@example.com', phone: '456-789-0124' },
  { id: '15', titre: 'Element 15', email: 'element15@example.com', phone: '567-890-1235' }
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
