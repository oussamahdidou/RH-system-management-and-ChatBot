import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployerService } from '../../services/employer.service';
import { error } from 'jquery';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrl: './employer.component.css',
})
export class EmployerComponent implements OnInit {
  title = 'ng2-charts-demo';
  surtempsdates: any[] = [];
  abscencesdates: any[] = [];
  surtempsnum: any[] = [];
  abscencesnum: any[] = [];
  constructor(
    public readonly authservice: AuthService,
    private route: ActivatedRoute,
    private readonly employerservice: EmployerService
  ) {}

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: this.surtempsdates,
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
        max: 20,
        ticks: {
          stepSize: 4,
        },
      },
    },
  };
  public lineChartLegend = true;
  public AbscencelineChartData: ChartConfiguration<'line'>['data'] = {
    labels: this.abscencesdates,
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
    aspectRatio: 24 / 20,
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 20,
        ticks: {
          stepSize: 4,
        },
      },
    },
  };
  public AbscencelineChartLegend = true;
  fileName: string = '';
  Employer: any;
  itemId!: any;
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fileName = input.files[0].name;
    }
  }
  extractColumnsAbscences(objects: any[]) {
    objects.forEach((obj) => {
      this.abscencesdates.unshift(obj.date);
      this.abscencesnum.unshift(obj.abscences);
    });
  }
  extractColumnsSurtemps(objects: any[]) {
    objects.forEach((obj) => {
      this.surtempsdates.unshift(obj.date);
      this.surtempsnum.unshift(obj.heuresupplimentaires);
    });
  }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.itemId = params['id'];
      this.employerservice.getemployersbyid(this.itemId).subscribe(
        (response) => {
          this.Employer = response;
        },
        (error) => {
          console.log(error);
        }
      );
      this.employerservice.employersurtempsByid(this.itemId).subscribe(
        (response) => {
          this.extractColumnsSurtemps(response);
        },
        (error) => {
          console.log(error);
        }
      );
      this.employerservice.employerabscencesByid(this.itemId).subscribe(
        (response) => {
          this.extractColumnsAbscences(response);
          console.log(response);
        },
        (error) => {}
      );
    });
  }
}
