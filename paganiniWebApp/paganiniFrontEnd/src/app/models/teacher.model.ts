import { User } from './user.model';

export interface Teacher {
  id: number;
  specialty: string;
  phone: string;
  user: User;
}