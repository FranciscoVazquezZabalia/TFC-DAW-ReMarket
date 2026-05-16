import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  private authService = inject(AuthService);
  private router = inject(Router);

  // Variables enlazadas al formulario
  nombre = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';

  // Se llama al hacer submit del formulario
  onRegister() {
    this.errorMessage = '';

    // Validación local: comprobamos que las dos contraseñas coincidan antes de llamar al backend
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    this.authService.register(this.nombre, this.email, this.password).subscribe({
      next: () => {
        // Registro correcto: redirigimos al inicio (ya quedamos autenticados)
        this.router.navigate(['/']);
      },
      error: () => {
        // El backend devolvió un error (email ya en uso, datos inválidos, etc.)
        this.errorMessage = 'Error al registrarse. El email puede estar en uso.';
      }
    });
  }
}
