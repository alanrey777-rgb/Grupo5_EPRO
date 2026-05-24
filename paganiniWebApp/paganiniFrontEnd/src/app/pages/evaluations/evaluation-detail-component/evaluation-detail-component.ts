import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Evaluation } from '../../../models/evaluation.model';
import { EvaluationService } from '../../../services/evaluation.service';

@Component({
  selector: 'app-evaluation-detail',
  imports: [CommonModule],
  templateUrl: './evaluation-detail-component.html'
})
export class EvaluationDetailComponent implements OnInit {

  evaluation!: Evaluation;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private evaluationService: EvaluationService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.evaluationService.findById(id).subscribe(data => {
      this.evaluation = data;
    });
  }

  goBack(): void {
    this.router.navigate(['/evaluations']);
  }
}