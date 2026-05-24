import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Lesson } from '../../../models/lesson.model';
import { Course } from '../../../models/course.model';

import { LessonService } from '../../../services/lesson.service';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-lesson-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './lesson-form-component.html'
})
export class LessonFormComponent implements OnInit {

  courses: Course[] = [];
  courseId: number | null = null;

  lesson: Lesson = {
    title: '',
    lessonDate: '',
    visible: true,
    course: {} as any
  };

  constructor(
    private lessonService: LessonService,
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

  saveLesson(): void {
    if (!this.lesson.title || !this.lesson.lessonDate || !this.courseId) {
      return;
    }

    this.lesson.course = { id: this.courseId } as any;

    this.lessonService.save(this.lesson).subscribe({
      next: () => {
        Swal.fire({
          title: 'Lección guardada',
          text: 'La lección fue registrada correctamente',
          icon: 'success',
          confirmButtonColor: '#ea580c'
        });

        this.router.navigate(['/lessons']);
      },
      error: () => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo guardar la lección',
          icon: 'error',
          confirmButtonColor: '#ea580c'
        });
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/lessons']);
  }
}