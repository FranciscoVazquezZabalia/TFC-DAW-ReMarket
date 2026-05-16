import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

interface AuthResponse {
  token: string;
  email: string;
  nombre: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/auth';

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }).pipe(

      tap(response => this.guardarSesion(response))
    );
  }

  register(nombre: string, email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, { nombre, email, password }).pipe(
      tap(response => this.guardarSesion(response))
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('nombre');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getNombre(): string | null {
    return localStorage.getItem('nombre');
  }

  private guardarSesion(response: AuthResponse): void {
    localStorage.setItem('token', response.token);
    localStorage.setItem('email', response.email);
    localStorage.setItem('nombre', response.nombre);
  }
}
