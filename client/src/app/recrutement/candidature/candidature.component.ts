import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { RecrutementService } from '../../services/recrutement.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-candidature',
  templateUrl: './candidature.component.html',
  styleUrl: './candidature.component.css',
})
export class CandidatureComponent implements OnInit {
  constructor(
    private readonly recrutementservice: RecrutementService,
    private readonly route: ActivatedRoute,
    private readonly sanitizer: DomSanitizer
  ) {}
  candidature: any;
  candidatureid: any;
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.candidatureid = params['id'];
      this.recrutementservice.candidaturebyid(this.candidatureid).subscribe(
        (response) => {
          response.cv = this.sanitizer.bypassSecurityTrustResourceUrl(
            response.cv
          );
          console.log(response);
          this.candidature = response;
        },
        (error) => {}
      );
    });
  }

  Refuser() {
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
        Swal.fire({
          title: 'Waiting...',
          didOpen: () => {
            Swal.showLoading();
          },
        });
        this.recrutementservice
          .refusercandidature(this.candidatureid)
          .subscribe(
            (reponse) => {
              Swal.fire({
                title: 'Refused!',
                text: 'La candidature et refuser successfuly.',
                icon: 'success',
              });
              this.candidature.status = `Refuser`;
            },
            (error) => {}
          );
      }
    });
  }
  selectionner() {
    Swal.fire({
      title: 'Entretien DateTime',
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
            Swal.fire({
              title: 'waiting ...',
              didOpen: () => {
                Swal.showLoading();
              },
            });
            this.recrutementservice
              .selectionner(this.candidatureid, selectedDatetime)
              .subscribe(
                (response) => {
                  Swal.fire({
                    title: 'Success!',
                    text: 'Your Entretien has been confirmed.',
                    icon: 'success',
                  });
                  this.candidature.status = `Selectionner`;
                },
                (error) => {}
              );
          }
        });
      }
    });
  }
  integrer() {
    Swal.fire({
      title: 'Integrate candidat',
      html: `
<table>
<tr>
     <td>   Date: </td>
     <td><input type="datetime-local" id="datetime" class="swal2-input"  value="2024-05-28T12:00"></td>
      </tr>
      <tr>
       <td>   poste : </td> 
       <td>
        <select id="poste" class="swal2-select" >
          <option value="Pointeur selected">Pointeur</option>
          <option value="Manager">Manager</option>
          <option value="Recruteur" >Recruteur</option>
          <option value="Devellopeur">Devellopeur</option>
          <option value="Devops">Devops</option>
          <option value="Testeur" >Testeur</option>
          <option value="Chef de projet">Chef de projet</option>
          <option value="Techlead">Techlead</option>
          <option value="Product owner">Product owner</option>

        </select>
        </td>
        </tr>
        <tr>
       <td>   Role : </td> 
       <td>
        <select id="role" class="swal2-select" >
          <option value="Employer" >Employer</option>
          <option value="Pointeur">Pointeur</option>
          <option value="Manager">Manager</option>
          <option value="Recruteur" >Recruteur</option>

        </select>
        </td>
        </tr>
    <tr>
    <td> Salaire de base dh/h :  </td>
    <td> <input type="number"  min="77" id="duree" value="50" class="swal2-input">
     </td>
     </tr>
    <tr>
    <td> Password :  </td>
    <td> <input type="text"   id="password"  class="swal2-input">
     </td>
     </tr>

</table>
      `,
      showCancelButton: true,
      confirmButtonText: 'OK',
      preConfirm: () => {
        const datetime = (
          document.getElementById('datetime') as HTMLInputElement
        ).value;

        const poste = (document.getElementById('poste') as HTMLSelectElement)
          .value;
        const role = (document.getElementById('role') as HTMLSelectElement)
          .value;
        const duree = (document.getElementById('duree') as HTMLInputElement)
          .value;
        const password = (
          document.getElementById('password') as HTMLInputElement
        ).value;
        if (!datetime) {
          Swal.showValidationMessage('Please enter a datetime');
        }
        return { datetime, duree, poste, role, password };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const value = result.value;
        Swal.fire({
          title: 'Are you sure?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, confirm it!',
          cancelButtonText: 'No, cancel',
        }).then((confirmationResult) => {
          if (confirmationResult.isConfirmed) {
            Swal.fire({
              title: 'waiting ...',
              didOpen: () => {
                Swal.showLoading();
              },
            });
            this.recrutementservice
              .integrer(
                this.candidature.id,
                this.candidature.nom,
                this.candidature.mail,
                value.password,
                value.duree,
                value.datetime,
                value.poste,
                value.role
              )
              .subscribe((response) => {
                Swal.fire({
                  title: 'Success!',
                  text: 'the employer has been integrated successfuly',
                  icon: 'success',
                });
                this.candidature.status = `Integrer`;
              });
          }
        });
      }
    });
  }
}
