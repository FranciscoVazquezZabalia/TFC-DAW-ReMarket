import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {

  authService = inject(AuthService);
  private router = inject(Router);

  showcaseSections = [
    { title: 'Mundo Apple', subtitle: 'El ecosistema perfecto. Como nuevo.', img: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=2000&auto=format&fit=crop', textColor: 'text-dark' },
    { title: 'Tecnología', subtitle: 'Potencia para tu día a día.', img: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2000&auto=format&fit=crop', textColor: 'text-white' },
    { title: 'Moda', subtitle: 'Renueva tu estilo. Cuida el planeta.', img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2000&auto=format&fit=crop', textColor: 'text-white' },
    { title: 'Hogar', subtitle: 'Espacios que inspiran historia.', img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2000&auto=format&fit=crop', textColor: 'text-dark' }
  ];

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
