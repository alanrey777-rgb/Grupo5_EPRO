import { User } from './user.model';
import { Parent } from './parent.model';

export interface Student {
  id?: number;
  birthDate: string;
  phone: string;
  academicStatus: string;
  user: any;
  parent: any;
}