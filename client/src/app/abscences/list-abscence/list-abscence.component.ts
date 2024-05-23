import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-abscence',
  templateUrl: './list-abscence.component.html',
  styleUrl: './list-abscence.component.css'
})
export class ListAbscenceComponent implements OnInit {
  displayedColumns: string[] = ['name', 'date', 'action'];
  dataSource: MatTableDataSource<any>;

  items: any[] = [
    { name: 'Item 1', date: new Date('2023-01-01'), status: 'NonJustifier' },
    { name: 'Item 2', date: new Date('2023-02-01'), status: 'Justified' },
    { name: 'Item 3', date: new Date('2023-03-01'), status: 'Pending' },
    { name: 'Item 4', date: new Date('2023-04-01'), status: 'NonJustifier' },
    { name: 'Item 5', date: new Date('2023-05-01'), status: 'Justified' },
    { name: 'Item 6', date: new Date('2023-06-01'), status: 'Pending' },
    { name: 'Item 7', date: new Date('2023-07-01'), status: 'NonJustifier' },
    { name: 'Item 8', date: new Date('2023-08-01'), status: 'Justified' },
    { name: 'Item 9', date: new Date('2023-09-01'), status: 'Pending' },
    { name: 'Item 10', date: new Date('2023-10-01'), status: 'NonJustifier' },
    { name: 'Item 11', date: new Date('2023-11-01'), status: 'Justified' },
    { name: 'Item 12', date: new Date('2023-12-01'), status: 'Pending' },
    { name: 'Item 13', date: new Date('2024-01-01'), status: 'NonJustifier' },
    { name: 'Item 14', date: new Date('2024-02-01'), status: 'Justified' },
    { name: 'Item 15', date: new Date('2024-03-01'), status: 'Pending' }
];

  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource(this.items);
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  justify(item: any) {
    item.status = 'Justified';
    this.dataSource.data = [...this.items]; // Refresh the dataSource to reflect changes
  }
}