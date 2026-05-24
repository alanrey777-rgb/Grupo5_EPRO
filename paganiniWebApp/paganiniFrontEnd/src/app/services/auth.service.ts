import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  login(username: string, password: string): void {
    this.userService.findAll().subscribe(users => {
      const user = users.find(u =>
        u.username === username && u.password === password && u.enabled
      );

      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/dashboard']);
      } else {
        alert('Invalid username or password');
      }
    });
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }
}