import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PerformanceService } from '../../services/performance.service';
import { error } from 'jquery';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-abscence',
  templateUrl: './list-abscence.component.html',
  styleUrl: './list-abscence.component.css',
})
export class ListAbscenceComponent implements OnInit {
  displayedColumns: string[] = ['name', 'dateTime', 'action'];
  dataSource: MatTableDataSource<any>;
  items: any[] = [];
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private readonly perfrormanceservice: PerformanceService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.perfrormanceservice.getabscences().subscribe(
      (response) => {
        this.items = response;
        this.dataSource = new MatTableDataSource(this.items);
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'action':
              return item.status;
            default:
              return item[property];
          }
        };
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  justify(item: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Justify!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.perfrormanceservice.justifyabscence(item.id).subscribe(
          (response) => {
            Swal.fire({
              title: 'Justified!',
              text: 'the abscence is justified.',
              icon: 'success',
            });
            item.status = 'Justified';
            this.dataSource.data = [...this.items];
          },
          (error) => {}
        );
      }
    });

    // Refresh the dataSource to reflect changes
  }
}
