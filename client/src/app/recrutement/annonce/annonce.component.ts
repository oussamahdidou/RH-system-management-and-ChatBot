import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RecrutementService } from '../../services/recrutement.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrl: './annonce.component.css',
})
export class AnnonceComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'phone', 'more'];
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

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.annonceid = params['id'];
      this.recrutementservice.listcandidature(this.annonceid).subscribe(
        (response) => {
          this.offers = response.candidatures;
          this.dataSource = new MatTableDataSource(this.offers);

          this.dataSource.sort = this.sort;
        },
        (error) => {}
      );
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
