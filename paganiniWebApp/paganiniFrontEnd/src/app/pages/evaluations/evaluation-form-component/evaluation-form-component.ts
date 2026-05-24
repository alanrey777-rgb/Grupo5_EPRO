import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Evaluation } from '../../../models/evaluation.model';
import { Lesson } from '../../../models/lesson.model';

import { EvaluationService } from '../../../services/evaluation.service';
import { LessonService } from '../../../services/lesson.service';

@Component({
  selector: 'app-evaluation-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './evaluation-form-component.html'
})
export class EvaluationFormComponent implements OnInit {

  lessons: Lesson[] = [];
  lessonId: number | null = null;

  evaluation: Evaluation = {
    title: '',
    maxScore: 0,
    evaluationDate: '',
    lesson: {} as any
  };

  constructor(
    private evaluationService: EvaluationService,
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

  saveEvaluation(): void {
    if (!this.evaluation.title || !this.evaluation.maxScore || !this.evaluation.evaluationDate || !this.lessonId) {
      return;
    }

    this.evaluation.lesson = { id: this.lessonId } as any;

    this.evaluationService.save(this.evaluation).subscribe({
      next: () => {
        Swal.fire({
          title: 'Evaluación guardada',
          text: 'La evaluación fue registrada correctamente',
          icon: 'success',
          confirmButtonColor: '#ea580c'
        });

        this.router.navigate(['/evaluations']);
      },
      error: () => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo guardar la evaluación',
          icon: 'error',
          confirmButtonColor: '#ea580c'
        });
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/evaluations']);
  }
}