import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule],
  templateUrl: './course-list-component.html'
})
export class CourseListComponent implements OnInit {

  courses: Course[] = [];

  constructor(
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.findAll().subscribe(data => {
      this.courses = data;
    });
  }

  goToNewCourse(): void {
    this.router.navigate(['/courses/new']);
  }

  goToDetail(id: number): void {
    this.router.navigate(['/courses', id]);
  }

  goToEdit(id: number): void {
    this.router.navigate(['/courses', id, 'edit']);
  }

deleteCourse(id: number): void {

  Swal.fire({
    title: '¿Eliminar curso?',
    text: 'Esta acción no se puede deshacer',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ea580c',
    cancelButtonColor: '#78716c',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {

    if (result.isConfirmed) {

      this.courseService.delete(id).subscribe({

        next: () => {

          this.loadCourses();

          Swal.fire({
            title: 'Curso eliminado',
            text: 'El curso fue eliminado correctamente',
            icon: 'success',
            confirmButtonColor: '#ea580c'
          });

        },

        error: () => {

          Swal.fire({
            title: 'Error',
            text: 'No se pudo eliminar el curso',
            icon: 'error',
            confirmButtonColor: '#ea580c'
          });

        }

      });

    }

  });

}
}