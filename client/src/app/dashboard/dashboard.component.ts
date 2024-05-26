import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { AuthService } from '../services/auth.service';
import { EmployerService } from '../services/employer.service';
import { error } from 'jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  stats: any;
  abscencesdate: any[] = [];
  abscencesnum: any[] = [];
  surtempsdate: any[] = [];
  surtempsnum: any[] = [];
  surtempsemployers: any[] = [];
  surtempsemployersnum: any[] = [];
  abscenceemployers: any[] = [];
  abscenceemployersnum: any[] = [];
  constructor(
    public readonly authservice: AuthService,
    private readonly employerservice: EmployerService
  ) {}
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: this.surtempsdate,
    datasets: [
      {
        data: this.surtempsnum,
        label: 'heures supplimentaires',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(0,0,255,0.3)',
      },
    ],
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 20 / 20,
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
        },
      },
    },
  };
  public lineChartLegend = true;
  public barlineChartData: ChartConfiguration<'bar'>['data'] = {
    labels: this.surtempsemployers,
    datasets: [
      {
        data: this.surtempsemployersnum,
        label: 'heures supplimentaires',
        backgroundColor: 'rgba(0,0,255,0.3)',
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
  };
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 20 / 20,
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
        },
      },
    },
  };

  public barChartLegend = true;
  public AbscentebarlineChartData: ChartConfiguration<'bar'>['data'] = {
    labels: this.abscenceemployers,
    datasets: [
      {
        data: this.abscenceemployersnum,
        label: 'Abscences',
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
  };
  public AbscentebarChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 20 / 20,
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
        },
      },
    },
  };

  public AbscentebarChartLegend = true;

  public AbscencelineChartData: ChartConfiguration<'line'>['data'] = {
    labels: this.abscencesdate,
    datasets: [
      {
        data: this.abscencesnum,
        label: 'Abscences',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)',
      },
    ],
  };
  public AbscencelineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 20 / 20,
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
        },
      },
    },
  };
  public AbscencelineChartLegend = true;
  ngOnInit(): void {
    this.employerservice.employerabscences().subscribe(
      (response) => {
        this.extractColumnsAbscences(response);
      },
      (error) => {}
    );
    this.employerservice.employersurtemps().subscribe(
      (response) => {
        this.extractColumnsSurtemps(response);
      },
      (error) => {}
    );
    this.employerservice.topemployersabscences().subscribe(
      (response) => {
        this.extractTopColumnsAbscences(response);
      },
      (error) => {}
    );
    this.employerservice.topemployerssurtemps().subscribe(
      (response) => {
        this.extractTopColumnsSurtemps(response);
      },
      (error) => {}
    );
    this.employerservice.stats().subscribe(
      (response) => {
        this.stats = response;
      },
      (error) => {}
    );
  }
  extractColumnsAbscences(objects: any[]) {
    objects.forEach((obj) => {
      this.abscencesdate.unshift(obj.date);
      this.abscencesnum.unshift(obj.abscences);
    });
  }
  extractColumnsSurtemps(objects: any[]) {
    objects.forEach((obj) => {
      this.surtempsdate.unshift(obj.date);
      this.surtempsnum.unshift(obj.heuresupplimentaires);
    });
  }
  extractTopColumnsSurtemps(objects: any[]) {
    objects.forEach((obj) => {
      this.surtempsemployers.unshift(obj.username);
      this.surtempsemployersnum.unshift(obj.number);
    });
  }
  extractTopColumnsAbscences(objects: any[]) {
    objects.forEach((obj) => {
      this.abscenceemployers.unshift(obj.username);
      this.abscenceemployersnum.unshift(obj.number);
    });
  }
}
