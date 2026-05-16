import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
})
export class Catalog implements OnInit {

  // Servicios inyectados. Sin 'private' para que el template pueda acceder a authService
  productoService = inject(ProductoService);
  authService = inject(AuthService);
  router = inject(Router);

  // Imágenes del carrusel (se mantienen igual)
  featuredImages = [
    'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80'
  ];

  // Lista de productos que llegan del backend
  productos: any[] = [];

  // Estado de carga: true mientras esperamos la respuesta del backend
  cargando = true;

  // Estado de error: se pone en true si la llamada al backend falla
  error = false;

  // ngOnInit se ejecuta automáticamente cuando el componente se inicializa
  ngOnInit() {
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.cargando = false;
      },
      error: () => {
        this.error = true;
        this.cargando = false;
      }
    });
  }

  // Cierra la sesión del usuario y redirige al inicio
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
