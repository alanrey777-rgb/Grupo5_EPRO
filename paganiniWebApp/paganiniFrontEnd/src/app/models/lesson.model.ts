import { Course } from './course.model';

export interface Lesson {
  id?: number;
  title: string;
  lessonDate: string;
  visible: boolean;
  course: Course;
}