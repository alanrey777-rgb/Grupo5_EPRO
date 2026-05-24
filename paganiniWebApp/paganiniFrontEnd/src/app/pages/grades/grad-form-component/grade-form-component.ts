import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Grade } from '../../../models/grade.model';
import { Student } from '../../../models/student.model';
import { Evaluation } from '../../../models/evaluation.model';
import { Submission } from '../../../models/submission.model';

import { GradeService } from '../../../services/grade.service';
import { StudentService } from '../../../services/student.service';
import { EvaluationService } from '../../../services/evaluation.service';
import { SubmissionService } from '../../../services/submission.service';

@Component({
  selector: 'app-grade-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './grade-form-component.html'
})
export class GradeFormComponent implements OnInit {

  students: Student[] = [];
  evaluations: Evaluation[] = [];
  submissions: Submission[] = [];

  studentId: number | null = null;
  evaluationId: number | null = null;
  submissionId: number | null = null;

  grade: Grade = {
    score: 0,
    approved: false,
    comments: '',
    student: {} as any,
    evaluation: {} as any,
    submission: {} as any
  };

  constructor(
    private gradeService: GradeService,
    private studentService: StudentService,
    private evaluationService: EvaluationService,
    private submissionService: SubmissionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStudents();
    this.loadEvaluations();
    this.loadSubmissions();
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

  loadSubmissions(): void {
    this.submissionService.findAll().subscribe(data => {
      this.submissions = data;
    });
  }

  saveGrade(): void {
    if (!this.studentId || !this.evaluationId || !this.submissionId || this.grade.score === null || this.grade.score === undefined) {
      return;
    }

    this.grade.approved = this.grade.score >= 7;
    this.grade.student = { id: this.studentId } as any;
    this.grade.evaluation = { id: this.evaluationId } as any;
    this.grade.submission = { id: this.submissionId } as any;

    this.gradeService.save(this.grade).subscribe({
      next: () => {
        Swal.fire({
          title: 'Calificación guardada',
          text: 'La calificación fue registrada correctamente',
          icon: 'success',
          confirmButtonColor: '#ea580c'
        });

        this.router.navigate(['/grades']);
      },
      error: () => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo guardar la calificación',
          icon: 'error',
          confirmButtonColor: '#ea580c'
        });
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/grades']);
  }
}