import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './crear-producto.html',
  styleUrl: './crear-producto.css'
})
export class CrearProducto {

  private productoService = inject(ProductoService);
  private router = inject(Router);

  // Objeto del formulario: cada propiedad corresponde a un campo del backend
  producto = {
    titulo: '',
    descripcion: '',
    precio: 0,
    estado: '',
    categoria: ''
  };

  // Evita que el usuario pulse "Publicar" varias veces mientras se procesa
  enviando = false;

  // Mensaje de error que se muestra en el template si algo falla
  errorMsg = '';

  // Se llama al hacer submit del formulario
  onSubmit() {
    this.enviando = true;
    this.errorMsg = ''; // Limpiamos el error anterior

    this.productoService.crearProducto(this.producto).subscribe({
      next: () => {
        // Producto creado con éxito: redirigimos al catálogo
        this.router.navigate(['/catalog']);
      },
      error: () => {
        // El backend rechazó la petición (token expirado, datos inválidos, etc.)
        this.errorMsg = 'Error al publicar el producto. Inténtalo de nuevo.';
        this.enviando = false;
      }
    });
  }
}
