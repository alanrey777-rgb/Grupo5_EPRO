import { Lesson } from './lesson.model';

export interface Evaluation {
  id?: number;
  title: string;
  maxScore: number;
  evaluationDate: string;
  lesson: Lesson;
}