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
  // items = [
  //   {
  //  "id":"1",
  //     "name": "Alice Johnson",
  //     "Date": "2024-05-21",
  //     "status": "Justifier"
  //   },
  //   {
   // "id":"1",
  //     "name": "Bob Smith",
  //     "Date": "2024-05-20",
  //     "status": "NonJustifier"
  //   },

  // ];
items:any[] = [
    {
      "id":"1",
        "name": "Alice Johnson",
        "Date": "2024-05-21",
        "status": "Justifier"
    },
    {
      "id":"2",
        "name": "Bob Smith",
        "Date": "2024-05-20",
        "status": "NonJustifier"
    },
    {
      "id":"3",
        "name": "Catherine Davis",
        "Date": "2024-05-19",
        "status": "Justifier"
    },
    {
      "id":"4",
        "name": "David Brown",
        "Date": "2024-05-18",
        "status": "NonJustifier"
    },
    {
      "id":"5",
        "name": "Ella Williams",
        "Date": "2024-05-17",
        "status": "Justifier"
    },
    {
      "id":"6",
        "name": "Frank Miller",
        "Date": "2024-05-16",
        "status": "NonJustifier"
    },
    {
      "id":"7",
        "name": "Grace Wilson",
        "Date": "2024-05-15",
        "status": "Justifier"
    },
    {
      "id":"8",
        "name": "Henry Moore",
        "Date": "2024-05-14",
        "status": "NonJustifier"
    },
    {
      "id":"9",
        "name": "Isabella Taylor",
        "Date": "2024-05-13",
        "status": "Justifier"
    },
    {
      "id":"10",
        "name": "Jack Anderson",
        "Date": "2024-05-12",
        "status": "NonJustifier"
    }
]
;
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      
    };
      $('#dataTable').DataTable(this.dtOptions);
  
  }

  justify() {
    alert('Justifying: ' );
  }
}