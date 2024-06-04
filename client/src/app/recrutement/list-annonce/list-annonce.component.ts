import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RecrutementService } from '../../services/recrutement.service';

@Component({
  selector: 'app-list-annonce',
  templateUrl: './list-annonce.component.html',
  styleUrl: './list-annonce.component.css',
})
export class ListAnnonceComponent implements OnInit {
  displayedColumns: string[] = ['titre', 'nmbrMax', 'date', 'deadline', 'more'];
  dataSource: MatTableDataSource<any>;

  offers: any[] = [];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private readonly recrutementservice: RecrutementService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.recrutementservice.listannonce().subscribe(
      (response) => {
        this.offers = response;
        this.dataSource = new MatTableDataSource(this.offers);
        this.dataSource.sort = this.sort;
      },
      (error) => {}
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
