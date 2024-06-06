import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
      // Save the formData object as needed
    } else {
      console.log('Form is invalid');
    }
  }
}
