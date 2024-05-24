import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrl: './employer.component.css'
})
export class EmployerComponent  {
  title = 'ng2-charts-demo';

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July'
    ],
    datasets: [
      {
        data: [ 65, 59, 232, 81, 56, 55, 40 ],
        label: 'heures supplimentaires',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(0,0,255,0.3)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = { 
        responsive: false,
        scales: {
          y: {
          beginAtZero: true
          }
        },
  };
  public lineChartLegend = true;
  public AbscencelineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July'
    ],
    datasets: [
      {
        data: [5.07,2.03,1.50,9.53,6.21,3.89,9.63],
        label: 'Abscences',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  };
  public AbscencelineChartOptions: ChartOptions<'line'> = {
    responsive: false
  ,
    scales: {
      y: {
        beginAtZero: true
        
      }
    },
  };
  public AbscencelineChartLegend = true;
  constructor() {
  }

  ngOnInit() {
  }

}