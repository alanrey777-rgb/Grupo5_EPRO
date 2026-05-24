import { Student } from './student.model';
import { Evaluation } from './evaluation.model';
import { Submission } from './submission.model';

export interface Grade {
  id?: number;
  score: number;
  approved: boolean;
  comments: string;
  student: Student;
  evaluation: Evaluation;
  submission: Submission;
}