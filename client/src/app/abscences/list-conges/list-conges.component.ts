import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-conges',
  templateUrl: './list-conges.component.html',
  styleUrl: './list-conges.component.css'
})
export class ListCongesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'dateDebut', 'dateFin', 'duree', 'type', 'status'];
  dataSource: MatTableDataSource<any>;

  ongs: any[] = [
  { name: 'john doe', dateDebut: new Date('2023-01-01'), dateFin: new Date('2023-01-10'), duree: '10 days', type: 'Type A', status: 'en attente' },
  { name: 'james bond', dateDebut: new Date('2023-02-01'), dateFin: new Date('2023-02-05'), duree: '5 days', type: 'Type B', status: 'approuver' },
  { name: 'bdsm', dateDebut: new Date('2023-03-01'), dateFin: new Date('2023-03-15'), duree: '15 days', type: 'Type C', status: 'refuser' },
  { name: 'jane smith', dateDebut: new Date('2023-04-01'), dateFin: new Date('2023-04-07'), duree: '7 days', type: 'Type A', status: 'en attente' },
  { name: 'alice johnson', dateDebut: new Date('2023-05-01'), dateFin: new Date('2023-05-03'), duree: '3 days', type: 'Type B', status: 'approuver' },
  { name: 'robert brown', dateDebut: new Date('2023-06-01'), dateFin: new Date('2023-06-10'), duree: '10 days', type: 'Type C', status: 'refuser' },
  { name: 'emily davis', dateDebut: new Date('2023-07-01'), dateFin: new Date('2023-07-05'), duree: '5 days', type: 'Type A', status: 'en attente' },
  { name: 'michael wilson', dateDebut: new Date('2023-08-01'), dateFin: new Date('2023-08-08'), duree: '8 days', type: 'Type B', status: 'approuver' },
  { name: 'chris lee', dateDebut: new Date('2023-09-01'), dateFin: new Date('2023-09-10'), duree: '10 days', type: 'Type C', status: 'refuser' },
  { name: 'patricia moore', dateDebut: new Date('2023-10-01'), dateFin: new Date('2023-10-15'), duree: '15 days', type: 'Type A', status: 'en attente' },
  { name: 'daniel taylor', dateDebut: new Date('2023-11-01'), dateFin: new Date('2023-11-05'), duree: '5 days', type: 'Type B', status: 'approuver' },
  { name: 'sarah anderson', dateDebut: new Date('2023-12-01'), dateFin: new Date('2023-12-10'), duree: '10 days', type: 'Type C', status: 'refuser' },
  { name: 'mark harris', dateDebut: new Date('2024-01-01'), dateFin: new Date('2024-01-10'), duree: '10 days', type: 'Type A', status: 'en attente' },
  { name: 'julia clark', dateDebut: new Date('2024-02-01'), dateFin: new Date('2024-02-05'), duree: '5 days', type: 'Type B', status: 'approuver' },
  { name: 'kevin hall', dateDebut: new Date('2024-03-01'), dateFin: new Date('2024-03-15'), duree: '15 days', type: 'Type C', status: 'refuser' }
];

  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource(this.ongs);
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  approve(ong: any) {
    ong.status = 'approuver';
    this.dataSource.data = [...this.ongs]; // Refresh the dataSource to reflect changes
  }

  reject(ong: any) {
    ong.status = 'refuser';
    this.dataSource.data = [...this.ongs]; // Refresh the dataSource to reflect changes
  }
}
