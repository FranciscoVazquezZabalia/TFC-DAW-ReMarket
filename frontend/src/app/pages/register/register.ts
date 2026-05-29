import { Component, inject, ChangeDetectorRef } from '@angular/core';
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
  private cdr = inject(ChangeDetectorRef);

  nombre = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  enviando = false;

  onRegister() {
    this.errorMessage = '';

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      this.cdr.detectChanges();
      return;
    }

    this.enviando = true;
    this.cdr.detectChanges();

    this.authService.register(this.nombre, this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/catalog']);
      },
      error: () => {
        this.enviando = false;
        this.errorMessage = 'Error al registrarse. El email puede estar en uso.';
        this.cdr.detectChanges();
      }
    });
  }
}
