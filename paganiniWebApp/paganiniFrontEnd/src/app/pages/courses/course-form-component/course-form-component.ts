import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import Swal from 'sweetalert2';

import { CourseService } from '../../../services/course.service';
import { TeacherService } from '../../../services/teacher.service';

import { Course } from '../../../models/course.model';
import { Teacher } from '../../../models/teacher.model';

@Component({
  selector: 'app-course-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './course-form-component.html'
})
export class CourseFormComponent implements OnInit {

  teachers: Teacher[] = [];

  teacherId: number | null = null;

  course: Course = {
    name: '',
    level: '',
    active: true,
    teacher: {} as any
  };

  constructor(
    private courseService: CourseService,
    private teacherService: TeacherService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers(): void {

    this.teacherService.findAll().subscribe(data => {
      this.teachers = data;
    });

  }

  saveCourse(): void {

    if (!this.course.name || !this.course.level || !this.teacherId) {
      return;
    }

    this.course.teacher = {
      id: this.teacherId
    } as any;

    this.courseService.save(this.course).subscribe({

      next: () => {

        Swal.fire({
          title: 'Curso guardado',
          text: 'El curso fue registrado correctamente',
          icon: 'success',
          confirmButtonColor: '#ea580c'
        });

        this.router.navigate(['/courses']);
      },

      error: () => {

        Swal.fire({
          title: 'Error',
          text: 'No se pudo guardar el curso',
          icon: 'error',
          confirmButtonColor: '#ea580c'
        });

      }

    });

  }

  cancel(): void {
    this.router.navigate(['/courses']);
  }

}