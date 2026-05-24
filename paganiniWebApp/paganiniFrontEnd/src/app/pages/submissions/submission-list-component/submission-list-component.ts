import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Submission } from '../../../models/submission.model';
import { SubmissionService } from '../../../services/submission.service';

@Component({
  selector: 'app-submission-list',
  imports: [CommonModule],
  templateUrl: './submission-list-component.html'
})
export class SubmissionListComponent implements OnInit {

  submissions: Submission[] = [];

  constructor(
    private submissionService: SubmissionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSubmissions();
  }

  loadSubmissions(): void {
    this.submissionService.findAll().subscribe(data => {
      this.submissions = data;
    });
  }

  goToNewSubmission(): void {
    this.router.navigate(['/submissions/new']);
  }

  goToDetail(id: number): void {
    this.router.navigate(['/submissions', id]);
  }

  goToEdit(id: number): void {
    this.router.navigate(['/submissions', id, 'edit']);
  }

  deleteSubmission(id: number): void {
    Swal.fire({
      title: '¿Eliminar entrega?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ea580c',
      cancelButtonColor: '#78716c',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {

      if (result.isConfirmed) {

        this.submissionService.delete(id).subscribe({
          next: () => {
            this.loadSubmissions();

            Swal.fire({
              title: 'Entrega eliminada',
              text: 'La entrega fue eliminada correctamente',
              icon: 'success',
              confirmButtonColor: '#ea580c'
            });
          },
          error: () => {
            Swal.fire({
              title: 'Error',
              text: 'No se pudo eliminar la entrega',
              icon: 'error',
              confirmButtonColor: '#ea580c'
            });
          }
        });

      }

    });
  }
}