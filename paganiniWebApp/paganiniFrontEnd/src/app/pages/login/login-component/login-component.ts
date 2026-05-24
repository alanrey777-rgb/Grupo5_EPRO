import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import Swal from 'sweetalert2';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login-component.html'
})
export class LoginComponent {

  username = '';
  password = '';

  constructor(private authService: AuthService) {}

  login(): void {

    this.authService.login(this.username, this.password);

    Swal.fire({
      title: 'Usuario autenticado',
      text: 'Bienvenido al sistema Paganini LMS',
      icon: 'success',
      confirmButtonColor: '#ea580c'
    });

  }
}