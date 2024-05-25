import { Component } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-candidature',
  templateUrl: './candidature.component.html',
  styleUrl: './candidature.component.css',
})
export class CandidatureComponent {
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
