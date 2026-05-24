import { Routes } from '@angular/router';

import { CourseFormComponent } from './pages/courses/course-form-component/course-form-component';
import { CourseListComponent } from './pages/courses/course-list-component/course-list-component';
import { MainLayoutComponent } from './layout/main-layout/main-layout-component/main-layout-component';
import { CourseDetailComponent } from './pages/courses/course-detail-component/course-detail-component';
import { DashboardComponent } from './pages/dashboard/dashboard-component/dashboard-component';
import { EvaluationDetailComponent } from './pages/evaluations/evaluation-detail-component/evaluation-detail-component';
import { EvaluationFormComponent } from './pages/evaluations/evaluation-form-component/evaluation-form-component';
import { EvaluationListComponent } from './pages/evaluations/evaluation-list-component/evaluation-list-component';
import { GradeDetailComponent } from './pages/grades/grade-detail-component/grade-detail-component';
import { GradeListComponent } from './pages/grades/grade-list-component/grade-list-component';
import { LessonDetailComponent } from './pages/lessons/lesson-detail-component/lesson-detail-component';
import { LessonFormComponent } from './pages/lessons/lesson-form-component/lesson-form-component';
import { LessonListComponent } from './pages/lessons/lesson-list-component/lesson-list-component';
import { StudentDetailComponent } from './pages/students/student-detail-component/student-detail-component';
import { StudentFormComponent } from './pages/students/student-form-component/student-form-component';
import { StudentListComponent } from './pages/students/student-list-component/student-list-component';
import { SubmissionDetailComponent } from './pages/submissions/submission-detail-component/submission-detail-component';
import { SubmissionFormComponent } from './pages/submissions/submission-form-component/submission-form-component';
import { SubmissionListComponent } from './pages/submissions/submission-list-component/submission-list-component';
import { LoginComponent } from './pages/login/login-component/login-component';
import { GradeFormComponent } from './pages/grades/grad-form-component/grade-form-component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },

      { path: 'courses', component: CourseListComponent },
      { path: 'courses/new', component: CourseFormComponent },
      { path: 'courses/:id', component: CourseDetailComponent },
      { path: 'courses/:id/edit', component: CourseFormComponent },

      { path: 'students', component: StudentListComponent },
      { path: 'students/new', component: StudentFormComponent },
      { path: 'students/:id', component: StudentDetailComponent },
      { path: 'students/:id/edit', component: StudentFormComponent },

      { path: 'lessons', component: LessonListComponent },
      { path: 'lessons/new', component: LessonFormComponent },
      { path: 'lessons/:id', component: LessonDetailComponent },
      { path: 'lessons/:id/edit', component: LessonFormComponent },

      { path: 'evaluations', component: EvaluationListComponent },
      { path: 'evaluations/new', component: EvaluationFormComponent },
      { path: 'evaluations/:id', component: EvaluationDetailComponent },
      { path: 'evaluations/:id/edit', component: EvaluationFormComponent },

      { path: 'submissions', component: SubmissionListComponent },
      { path: 'submissions/new', component: SubmissionFormComponent },
      { path: 'submissions/:id', component: SubmissionDetailComponent },
      { path: 'submissions/:id/edit', component: SubmissionFormComponent },

      { path: 'grades', component: GradeListComponent },
      { path: 'grades/new', component: GradeFormComponent },
      { path: 'grades/:id', component: GradeDetailComponent },
      { path: 'grades/:id/edit', component: GradeFormComponent }
    ]
  },

  { path: '**', redirectTo: 'login' }
];