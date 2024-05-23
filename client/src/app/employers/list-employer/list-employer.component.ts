import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import 'datatables.net';
import 'datatables.net-bs4';


@Component({
  selector: 'app-list-employer',
  templateUrl: './list-employer.component.html',
  styleUrl: './list-employer.component.css'
})
export class ListEmployerComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'phone', 'poste', 'action'];
  dataSource: MatTableDataSource<any>;

  employees: any[] = [
    { name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890', poste: 'Manager',id:'1' },
    { name: 'Jane Smith', email: 'jane.smith@example.com', phone: '098-765-4321', poste: 'Developer',id:'2' },
    // more employees
  ];

  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource(this.employees);
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}