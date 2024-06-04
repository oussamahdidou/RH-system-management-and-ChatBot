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
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        });
      }
    });
  }
}
