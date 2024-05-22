import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import DataTables from 'datatables.net';
import 'datatables.net-bs4';
@Component({
  selector: 'app-list-employers',
  standalone: true,
  imports: [HttpClientModule,DataTablesModule],
  templateUrl: './list-employers.component.html',
  styleUrl: './list-employers.component.css'
})
export class ListEmployersComponent implements OnInit {
  dtOptions = {};
  items = [
    {
      "name": "Alice Johnson",
      "Date": "2024-05-21",
      "status": "Justifier"
    },
    {
      "name": "Bob Smith",
      "Date": "2024-05-20",
      "status": "NonJustifier"
    },
    // Add more data objects here...
  ];

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    setTimeout(() => {
      // Initialize DataTables after Angular rendering
      $('#dataTable').DataTable(this.dtOptions);
    }, 0);
  }

  justify() {
    alert('Justifying: ' );
    // Add your logic for justifying here...
  }
}