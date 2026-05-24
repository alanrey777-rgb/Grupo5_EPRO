import { Teacher } from './teacher.model';

export interface Course {
  id?: number;
  name: string;
  level: string;
  active: boolean;
  teacher: Teacher;
}