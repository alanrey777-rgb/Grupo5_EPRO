import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Student } from '../../../models/student.model';
import { User } from '../../../models/user.model';
import { Parent } from '../../../models/parent.model';

import { StudentService } from '../../../services/student.service';
import { UserService } from '../../../services/user.service';
import { ParentService } from '../../../services/parent.service';

@Component({
  selector: 'app-student-form',
  imports: [FormsModule],
  templateUrl: './student-form-component.html'
})
export class StudentFormComponent implements OnInit {

  users: User[] = [];
  parents: Parent[] = [];

  userId: number | null = null;
  parentId: number | null = null;

  student: Student = {
    birthDate: '',
    phone: '',
    academicStatus: '',
    user: {} as any,
    parent: {} as any,
  };

  constructor(
    private studentService: StudentService,
    private userService: UserService,
    private parentService: ParentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadParents();
  }

  loadUsers(): void {
    this.userService.findAll().subscribe(data => {
      this.users = data;
    });
  }

  loadParents(): void {
    this.parentService.findAll().subscribe(data => {
      this.parents = data;
    });
  }

  saveStudent(): void {
    if (!this.userId || !this.parentId) {
      Swal.fire({
        title: 'Datos requeridos',
        text: 'Debes seleccionar usuario y encargado',
        icon: 'warning',
        confirmButtonColor: '#ea580c'
      });
      return;
    }

    this.student.user = { id: this.userId } as any;
    this.student.parent = { id: this.parentId } as any;

    this.studentService.save(this.student).subscribe({
      next: () => {
        Swal.fire({
          title: 'Alumno guardado',
          text: 'El alumno fue registrado correctamente',
          icon: 'success',
          confirmButtonColor: '#ea580c'
        });

        this.router.navigate(['/students']);
      },
      error: () => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo guardar el alumno',
          icon: 'error',
          confirmButtonColor: '#ea580c'
        });
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/students']);
  }
}