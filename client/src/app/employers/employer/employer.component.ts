import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployerService } from '../../services/employer.service';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrl: './employer.component.css',
})
export class EmployerComponent {
  title = 'ng2-charts-demo';

  constructor(
    public readonly authservice: AuthService,
    private route: ActivatedRoute,
    private readonly employerservice: EmployerService
  ) {}

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        data: [6, 9, 23, 8, 5, 5, 4],
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
  public AbscencelineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        data: [5.07, 2.03, 1.5, 9.53, 6.21, 3.89, 50],
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
        max: 100,
        ticks: {
          stepSize: 20,
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

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.itemId = params['id'];
      this.employerservice.getemployersbyid(this.itemId).subscribe(
        (response) => {
          console.log(response);
          this.Employer = response;
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }
}
