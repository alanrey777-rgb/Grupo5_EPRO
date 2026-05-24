import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Submission } from '../../../models/submission.model';
import { Student } from '../../../models/student.model';
import { Evaluation } from '../../../models/evaluation.model';

import { SubmissionService } from '../../../services/submission.service';
import { StudentService } from '../../../services/student.service';
import { EvaluationService } from '../../../services/evaluation.service';

@Component({
  selector: 'app-submission-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './submission-form-component.html'
})
export class SubmissionFormComponent implements OnInit {

  students: Student[] = [];
  evaluations: Evaluation[] = [];

  studentId: number | null = null;
  evaluationId: number | null = null;

  submission: Submission = {
    title: '',
    youtubeUrl: '',
    comments: '',
    submittedAt: '',
    student: {} as any,
    evaluation: {} as any
  };

  constructor(
    private submissionService: SubmissionService,
    private studentService: StudentService,
    private evaluationService: EvaluationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStudents();
    this.loadEvaluations();
  }

  loadStudents(): void {
    this.studentService.findAll().subscribe(data => {
      this.students = data;
    });
  }

  loadEvaluations(): void {
    this.evaluationService.findAll().subscribe(data => {
      this.evaluations = data;
    });
  }

  saveSubmission(): void {
    if (!this.submission.title || !this.submission.youtubeUrl || !this.studentId || !this.evaluationId) {
      return;
    }

    this.submission.submittedAt = new Date().toISOString();
    this.submission.student = { id: this.studentId } as any;
    this.submission.evaluation = { id: this.evaluationId } as any;

    this.submissionService.save(this.submission).subscribe({
      next: () => {
        Swal.fire({
          title: 'Entrega guardada',
          text: 'La entrega fue registrada correctamente',
          icon: 'success',
          confirmButtonColor: '#ea580c'
        });

        this.router.navigate(['/submissions']);
      },
      error: () => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo guardar la entrega',
          icon: 'error',
          confirmButtonColor: '#ea580c'
        });
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/submissions']);
  }
}