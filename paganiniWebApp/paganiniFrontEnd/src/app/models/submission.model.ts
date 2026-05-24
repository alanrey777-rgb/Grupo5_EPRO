import { Student } from './student.model';
import { Evaluation } from './evaluation.model';

export interface Submission {
  id?: number;
  title: string;
  youtubeUrl: string;
  comments: string;
  submittedAt: string;
  student: Student;
  evaluation: Evaluation;
}