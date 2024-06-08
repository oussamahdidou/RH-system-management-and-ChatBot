import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RecrutementService } from '../../services/recrutement.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrl: './annonce.component.css',
})
export class AnnonceComponent implements OnInit {
  displayedColumns: string[] = ['nom', 'mail', 'numTel', 'more'];
  dataSource: MatTableDataSource<any>;

  offers: any[] = [];
  annonceid: any;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private readonly recrutementservice: RecrutementService,
    private readonly route: ActivatedRoute
  ) {
    this.dataSource = new MatTableDataSource();
  }
  annonce: any;
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.annonceid = params['id'];
      this.recrutementservice.listcandidature(this.annonceid).subscribe(
        (response) => {
          this.annonce = response;
          console.log(response);
          this.offers = response.candidatures;
          this.dataSource = new MatTableDataSource(this.offers);
          this.dataSource.sortingDataAccessor = (item, property) => {
            switch (property) {
              default:
                return item[property];
            }
          };
          this.dataSource.sort = this.sort;
        },
        (error) => {
          Swal.fire({
            title: 'Error',
            text: `${error.error}`,
            icon: 'error',
          });
        }
      );
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
