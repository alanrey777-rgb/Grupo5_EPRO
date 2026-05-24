import { Student } from './student.model';
import { Course } from './course.model';

export interface Enrollment {
  id: number;
  enrollmentDate: string;
  status: string;
  student: Student;
  course: Course;
}