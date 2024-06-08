import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecrutementService } from '../../services/recrutement.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-postule',
  templateUrl: './postule.component.html',
  styleUrl: './postule.component.css',
})
export class PostuleComponent {
  offers: any[] = [];
  annonceid: any;
  applicationForm!: FormGroup;
  file: File | null = null;
  constructor(
    private readonly recrutementservice: RecrutementService,
    private readonly route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.applicationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      numTel: ['', Validators.required],
      file: [null, Validators.required],
    });
  }
  annonce: any;
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.annonceid = params['id'];
      this.recrutementservice.listcandidature(this.annonceid).subscribe(
        (response) => {
          this.annonce = response;
          console.log(response);
          this.offers = response.candidatures;
        },
        (error) => {}
      );
    });
  }
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.applicationForm.patchValue({ file: this.file });
    }
  }

  onSubmit() {
    if (this.applicationForm.valid) {
      const formData = new FormData();
      formData.append('Mail', this.applicationForm.get('email')?.value);
      formData.append('Nom', this.applicationForm.get('fullName')?.value);
      formData.append('NumTel', this.applicationForm.get('numTel')?.value);
      if (this.file) {
        formData.append('CV', this.file);
      }
      Swal.fire({
        title: 'waiting ...',
        didOpen: () => {
          Swal.showLoading();
        },
      });
      this.recrutementservice.postuler(this.annonceid, formData).subscribe(
        (reponse) => {
          Swal.fire({
            title: 'Success!',
            text: 'your apply has been saved',
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
  }
}
