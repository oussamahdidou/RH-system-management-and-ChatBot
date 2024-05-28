import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PerformanceService } from '../../services/performance.service';

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
    this.performanceservice.approuver(ong.id).subscribe(
      (response) => {
        ong.status = 'Approuver';
        this.dataSource.data = [...this.ongs];
      },
      (error) => {}
    );
  }

  reject(ong: any) {
    this.performanceservice.refuser(ong.id).subscribe(
      (response) => {
        ong.status = 'Refuser';
        this.dataSource.data = [...this.ongs];
      },
      (error) => {}
    );
  }
}
