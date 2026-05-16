import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  // FormsModule es necesario para usar [(ngModel)] en el template
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  // inject() inyecta los servicios sin necesitar constructor (estilo moderno Angular)
  private authService = inject(AuthService);
  private router = inject(Router);

  // Variables enlazadas al formulario mediante [(ngModel)]
  email = '';
  password = '';
  errorMessage = '';

  // Se llama al hacer submit del formulario (via ngSubmit en el template)
  onLogin() {
    this.errorMessage = ''; // Limpiamos cualquier error previo antes de intentar

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        // Login correcto: redirigimos al inicio
        this.router.navigate(['/']);
      },
      error: () => {
        // El backend devolvió un error (401 credenciales incorrectas, etc.)
        this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.';
      }
    });
  }
}
