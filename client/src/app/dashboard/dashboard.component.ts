import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
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
  public barlineChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7'],
    datasets: [
      {
        data: [6, 9, 23, 8, 5, 5, 4],
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
    labels: ['item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7'],
    datasets: [
      {
        data: [6, 9, 23, 8, 5, 5, 4],
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
}
