import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployerService } from '../../services/employer.service';
import { error } from 'jquery';
import { PerformanceService } from '../../services/performance.service';
import Swal from 'sweetalert2';
import { FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';

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
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private readonly employerservice: EmployerService,
    private readonly performanceservice: PerformanceService
  ) {}
  calculateMonthDifference(startDate: any, endDate: any): string {
    let start = new Date(startDate);
    let end = new Date(endDate);

    // Swap the dates if start date is later than end date
    if (start > end) {
      [start, end] = [end, start];
    }

    const startYear = start.getFullYear();
    const startMonth = start.getMonth();
    const endYear = end.getFullYear();
    const endMonth = end.getMonth();

    const totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth);

    // Convert the result to string
    return totalMonths.toString();
  }

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
  congespassed: any;
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const formData = new FormData();
      formData.append('image', input.files[0]);
      this.employerservice.updateprofile(formData).subscribe(
        (response) => {
          this.Employer = response;
        },
        (error) => {
          Swal.fire({
            title: 'Error',
            text: `${error.error}`,
            icon: 'error',
          });
        }
      );
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
      this.employerservice.congesannuel(this.itemId).subscribe(
        (response) => {
          this.congespassed = response;
        },
        (error) => {}
      );
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
  addabscence() {
    Swal.fire({
      title: 'Signaler une abscence',
      html: '<input type="datetime-local" id="datetime" class="swal2-input">',
      showCancelButton: true,
      confirmButtonText: 'OK',
      preConfirm: () => {
        const datetime = (
          document.getElementById('datetime') as HTMLInputElement
        ).value;
        if (!datetime) {
          Swal.showValidationMessage('Please enter a datetime');
        }
        return datetime;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedDatetime = result.value;
        Swal.fire({
          title: 'Are you sure?',
          text: `You selected: ${selectedDatetime}`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, confirm it!',
          cancelButtonText: 'No, cancel',
        }).then((confirmationResult) => {
          if (confirmationResult.isConfirmed) {
            this.performanceservice
              .addabscence(this.itemId, selectedDatetime)
              .subscribe(
                (response) => {
                  console.log(response);
                },
                (error) => {
                  Swal.fire({
                    title: 'Error',
                    text: `${error.error}`,
                    icon: 'error',
                  });
                }
              );
            Swal.fire({
              title: 'Success!',
              text: 'Your datetime has been confirmed.',
              icon: 'success',
            });
          }
        });
      }
    });
  }
  addsurtemps() {
    Swal.fire({
      title: 'SIgnaler Surtemps',
      html: '<input type="datetime-local" id="datetime" class="swal2-input">',
      showCancelButton: true,
      confirmButtonText: 'OK',
      preConfirm: () => {
        const datetime = (
          document.getElementById('datetime') as HTMLInputElement
        ).value;
        if (!datetime) {
          Swal.showValidationMessage('Please enter a datetime');
        }
        return datetime;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedDatetime = result.value;
        Swal.fire({
          title: 'Are you sure?',
          text: `You selected: ${selectedDatetime}`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, confirm it!',
          cancelButtonText: 'No, cancel',
        }).then((confirmationResult) => {
          if (confirmationResult.isConfirmed) {
            this.performanceservice
              .addsurtemps(this.itemId, selectedDatetime)
              .subscribe(
                (response) => {
                  console.log(response);
                },
                (error) => {
                  Swal.fire({
                    title: 'Error',
                    text: `${error.error}`,
                    icon: 'error',
                  });
                }
              );
            Swal.fire({
              title: 'Success!',
              text: 'Your datetime has been confirmed.',
              icon: 'success',
            });
          }
        });
      }
    });
  }

  displaymodal() {
    Swal.fire({
      title: 'Demande de Conges',
      html: `
<table>
<tr>
     <td>   Date: </td><td><input type="datetime-local" id="datetime" class="swal2-input"  value="2024-05-28T12:00"></td>
      </tr>
      <tr>
       <td>   Type: </td> 
       <td>
        <select id="type" class="swal2-select" >
          <option value="MariageSalarie selected">MariageSalarie</option>
          <option value="CongeNaissance">CongeNaissance</option>
          <option value="MariageEnfant">MariageEnfant</option>
          <option value="CongesAnnuel" >CongesAnnuel</option>
          <option value="DecesProche">DecesProche</option>
          <option value="DecesLoin">DecesLoin</option>
          <option value="Chirurgie">Chirurgie</option>
          <option value="Maternite">Maternite</option>
          <option value="Examen">Examen</option>
        </select>
        </td>
        </tr>
    <tr><td> Duree :  </td><td> <input type="number" disabled min="7" id="duree" value="3" class="swal2-input"> </td></tr>


</table>
      `,
      showCancelButton: true,
      confirmButtonText: 'OK',
      preConfirm: () => {
        const datetime = (
          document.getElementById('datetime') as HTMLInputElement
        ).value;

        const type = (document.getElementById('type') as HTMLSelectElement)
          .value;
        const duree = (document.getElementById('duree') as HTMLInputElement)
          .value;
        if (!datetime) {
          Swal.showValidationMessage('Please enter a datetime');
        }
        return { datetime, duree, type };
      },
      didOpen: () => {
        const datetimeElement = document.getElementById(
          'datetime'
        ) as HTMLInputElement;
        const typeElement = document.getElementById(
          'type'
        ) as HTMLSelectElement;

        typeElement.addEventListener('change', () => this.updateDuree());
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedDatetime = result.value;
        Swal.fire({
          title: 'Are you sure?',
          text: `You selected: ${selectedDatetime.datetime}`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, confirm it!',
          cancelButtonText: 'No, cancel',
        }).then((confirmationResult) => {
          if (confirmationResult.isConfirmed) {
            this.employerservice
              .addconges(
                selectedDatetime.datetime,
                selectedDatetime.duree,
                selectedDatetime.type
              )
              .subscribe(
                (response) => {
                  Swal.fire({
                    title: 'Success!',
                    text: 'Ta demander est bien envoyer',
                    icon: 'success',
                  });
                },
                (error) => {
                  Swal.fire({
                    title: 'Error',
                    text: `${error.error}`,
                    icon: 'error',
                  });
                }
              );
          }
        });
      }
    });
  }
  deleteaccount() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.employerservice.deleteaccount(this.itemId).subscribe(
          (response) => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            });
          },
          (error) => {
            Swal.fire({
              title: `Error`,
              text: `${error.error}`,
              icon: 'error',
            });
          }
        );
      }
    });
  }
  updateDuree() {
    const datetimeElement = document.getElementById(
      'datetime'
    ) as HTMLInputElement;
    const type = (document.getElementById('type') as HTMLSelectElement).value;
    const duree = document.getElementById('duree') as HTMLInputElement;

    switch (type) {
      case 'MariageSalarie':
        duree.value = '4';
        duree.disabled = true;
        break;
      case 'CongeNaissance':
        duree.value = '3';
        duree.disabled = true;
        break;
      case 'MariageEnfant':
        duree.value = '2';
        duree.disabled = true;
        break;
      case 'CongesAnnuel':
        const monthDifference: any = this.calculateMonthDifference(
          datetimeElement.value,
          this.Employer.integrationDate
        );
        const durationValue = (
          monthDifference * 1.5 -
          this.congespassed
        ).toString();
        duree.value = durationValue;
        console.log(duree.value);
        duree.max = duree.value;
        duree.disabled = false;
        break;
      case 'DecesProche':
        duree.value = '3';
        duree.disabled = true;
        break;
      case 'DecesLoin':
        duree.value = '2';
        duree.disabled = true;
        break;
      case 'Chirurgie':
        duree.value = '2';
        duree.disabled = true;
        break;
      case 'Maternite':
        duree.value = '98';
        duree.disabled = true;
        break;
      case 'Examen':
        duree.value = '1';
        duree.disabled = true;
        break;
      default:
        duree.value = '';
        duree.disabled = false;
    }
  }
}
