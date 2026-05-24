import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Evaluation } from '../../../models/evaluation.model';
import { EvaluationService } from '../../../services/evaluation.service';

@Component({
  selector: 'app-evaluation-list',
  imports: [CommonModule],
  templateUrl: './evaluation-list-component.html'
})
export class EvaluationListComponent implements OnInit {

  evaluations: Evaluation[] = [];

  constructor(
    private evaluationService: EvaluationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEvaluations();
  }

  loadEvaluations(): void {
    this.evaluationService.findAll().subscribe(data => {
      this.evaluations = data;
    });
  }

  goToNewEvaluation(): void {
    this.router.navigate(['/evaluations/new']);
  }

  goToDetail(id: number): void {
    this.router.navigate(['/evaluations', id]);
  }

  goToEdit(id: number): void {
    this.router.navigate(['/evaluations', id, 'edit']);
  }

  deleteEvaluation(id: number): void {
    Swal.fire({
      title: '¿Eliminar evaluación?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ea580c',
      cancelButtonColor: '#78716c',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.evaluationService.delete(id).subscribe({
          next: () => {
            this.loadEvaluations();
            Swal.fire({
              title: 'Evaluación eliminada',
              text: 'La evaluación fue eliminada correctamente',
              icon: 'success',
              confirmButtonColor: '#ea580c'
            });
          },
          error: () => {
            Swal.fire({
              title: 'Error',
              text: 'No se pudo eliminar la evaluación',
              icon: 'error',
              confirmButtonColor: '#ea580c'
            });
          }
        });
      }
    });
  }
}