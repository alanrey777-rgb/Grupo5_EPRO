import { User } from './user.model';

export interface Parent {
  id: number;
  phone: string;
  address: string;
  user: User;
}