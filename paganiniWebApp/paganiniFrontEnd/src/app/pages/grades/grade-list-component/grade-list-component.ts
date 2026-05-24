import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Grade } from '../../../models/grade.model';
import { GradeService } from '../../../services/grade.service';

@Component({
  selector: 'app-grade-list',
  imports: [CommonModule],
  templateUrl: './grade-list-component.html'
})
export class GradeListComponent implements OnInit {

  grades: Grade[] = [];

  constructor(
    private gradeService: GradeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadGrades();
  }

  loadGrades(): void {
    this.gradeService.findAll().subscribe(data => {
      this.grades = data;
    });
  }

  goToNewGrade(): void {
    this.router.navigate(['/grades/new']);
  }

  goToDetail(id: number): void {
    this.router.navigate(['/grades', id]);
  }

  goToEdit(id: number): void {
    this.router.navigate(['/grades', id, 'edit']);
  }

  deleteGrade(id: number): void {
    Swal.fire({
      title: '¿Eliminar calificación?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ea580c',
      cancelButtonColor: '#78716c',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {

      if (result.isConfirmed) {

        this.gradeService.delete(id).subscribe({
          next: () => {
            this.loadGrades();

            Swal.fire({
              title: 'Calificación eliminada',
              text: 'La calificación fue eliminada correctamente',
              icon: 'success',
              confirmButtonColor: '#ea580c'
            });
          },
          error: () => {
            Swal.fire({
              title: 'Error',
              text: 'No se pudo eliminar la calificación',
              icon: 'error',
              confirmButtonColor: '#ea580c'
            });
          }
        });

      }

    });
  }
}