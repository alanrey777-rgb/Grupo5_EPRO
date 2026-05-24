import { Role } from './role.model';

export interface User {
  id: number;
  username: string;
  password?: string;
  fullName: string;
  email: string;
  enabled: boolean;
  role: Role;
}