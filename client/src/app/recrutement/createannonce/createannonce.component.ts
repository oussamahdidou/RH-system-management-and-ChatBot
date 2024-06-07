import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecrutementService } from '../../services/recrutement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-createannonce',
  templateUrl: './createannonce.component.html',
  styleUrl: './createannonce.component.css',
})
export class CreateannonceComponent implements OnInit {
  applicationForm!: FormGroup;
  constructor(
    private readonly recrutementservice: RecrutementService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.applicationForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      nmbrmax: ['', [Validators.required, Validators.min(7)]],
      deadline: ['', Validators.required],
    });
  }

  onsubmit(): void {
    if (this.applicationForm.valid) {
      const formData = this.applicationForm.value;
      console.log('Form Data:', formData);
      Swal.fire({
        title: 'Do you want to create this offer ?',

        showCancelButton: true,
        confirmButtonText: 'Yes',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.recrutementservice.createannonce(formData).subscribe(
            (response) => {
              Swal.fire('Saved!', '', 'success');
              this.router.navigate(['/recrutement/annonces']);
            },
            (error) => {}
          );
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
