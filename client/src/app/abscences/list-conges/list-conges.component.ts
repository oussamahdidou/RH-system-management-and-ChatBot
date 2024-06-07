import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PerformanceService } from '../../services/performance.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-conges',
  templateUrl: './list-conges.component.html',
  styleUrl: './list-conges.component.css',
})
export class ListCongesComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'dateDebut',
    'dateFin',
    'duree',
    'type',
    'status',
  ];
  dataSource: MatTableDataSource<any>;

  ongs: any[] = [];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private readonly performanceservice: PerformanceService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.performanceservice.getconges().subscribe(
      (response) => {
        this.ongs = response;
        console.log(this.ongs);
        this.dataSource = new MatTableDataSource(this.ongs);

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
      (error) => {}
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  approve(ong: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'waiting ...',
          didOpen: () => {
            Swal.showLoading();
          },
        });
        this.performanceservice.approuver(ong.id).subscribe(
          (response) => {
            ong.status = 'Approuver';
            this.dataSource.data = [...this.ongs];
            Swal.fire({
              title: 'Approuved!',
              text: 'Conges approuver.',
              icon: 'success',
            });
          },
          (error) => {}
        );
      }
    });
  }

  reject(ong: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'waiting ...',
          didOpen: () => {
            Swal.showLoading();
          },
        });
        this.performanceservice.refuser(ong.id).subscribe(
          (response) => {
            ong.status = 'Refuser';
            this.dataSource.data = [...this.ongs];
            Swal.fire({
              title: 'Conges!',
              text: 'Rejected successfuly',
              icon: 'success',
            });
          },
          (error) => {}
        );
      }
    });
  }
}
