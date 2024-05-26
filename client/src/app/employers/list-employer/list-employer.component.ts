import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import 'datatables.net';
import 'datatables.net-bs4';
import { EmployerService } from '../../services/employer.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-list-employer',
  templateUrl: './list-employer.component.html',
  styleUrl: './list-employer.component.css',
})
export class ListEmployerComponent implements OnInit {
  displayedColumns: string[] = ['userName', 'email', 'poste', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private readonly employerservice: EmployerService,
    public readonly authservice: AuthService
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.employerservice.getallemployers().subscribe(
      (response) => {
        this.dataSource.data = response;
        this.dataSource.sort = this.sort; // Ensure sort is set after data is assigned
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
