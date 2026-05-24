import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { StudentService } from '../../../services/student.service';
import { Student } from '../../../models/student.model';

@Component({
  selector: 'app-student-list',
  imports: [CommonModule],
  templateUrl: './student-list-component.html'
})
export class StudentListComponent implements OnInit {

  students: Student[] = [];

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.findAll().subscribe(data => {
      this.students = data;
    });
  }

  goToNewStudent(): void {
    this.router.navigate(['/students/new']);
  }

  goToDetail(id: number): void {
    this.router.navigate(['/students', id]);
  }

  goToEdit(id: number): void {
    this.router.navigate(['/students', id, 'edit']);
  }

  deleteStudent(id: number): void {
    Swal.fire({
      title: '¿Eliminar alumno?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ea580c',
      cancelButtonColor: '#78716c',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {

      if (result.isConfirmed) {
        this.studentService.delete(id).subscribe(() => {
          this.loadStudents();

          Swal.fire({
            title: 'Alumno eliminado',
            text: 'El registro fue eliminado correctamente',
            icon: 'success',
            confirmButtonColor: '#ea580c'
          });
        });
      }

    });
  }
}