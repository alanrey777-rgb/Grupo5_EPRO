import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Lesson } from '../../../models/lesson.model';
import { LessonService } from '../../../services/lesson.service';

@Component({
  selector: 'app-lesson-list',
  imports: [CommonModule],
  templateUrl: './lesson-list-component.html'
})
export class LessonListComponent implements OnInit {

  lessons: Lesson[] = [];

  constructor(
    private lessonService: LessonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadLessons();
  }

  loadLessons(): void {
    this.lessonService.findAll().subscribe(data => {
      this.lessons = data;
    });
  }

  goToNewLesson(): void {
    this.router.navigate(['/lessons/new']);
  }

  goToDetail(id: number): void {
    this.router.navigate(['/lessons', id]);
  }

  goToEdit(id: number): void {
    this.router.navigate(['/lessons', id, 'edit']);
  }

  deleteLesson(id: number): void {
    Swal.fire({
      title: '¿Eliminar lección?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ea580c',
      cancelButtonColor: '#78716c',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {

      if (result.isConfirmed) {

        this.lessonService.delete(id).subscribe({
          next: () => {
            this.loadLessons();

            Swal.fire({
              title: 'Lección eliminada',
              text: 'La lección fue eliminada correctamente',
              icon: 'success',
              confirmButtonColor: '#ea580c'
            });
          },
          error: () => {
            Swal.fire({
              title: 'Error',
              text: 'No se pudo eliminar la lección',
              icon: 'error',
              confirmButtonColor: '#ea580c'
            });
          }
        });

      }

    });
  }
}