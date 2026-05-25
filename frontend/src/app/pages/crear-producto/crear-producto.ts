import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductoService, Producto } from '../../services/producto.service';

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

  producto: Producto = {
    nombre: '',
    descripcion: '',
    precio: 0,
    categoria: ''
  };

  enviando = false;
  errorMsg = '';

  onSubmit() {
    this.enviando = true;
    this.errorMsg = '';

    this.productoService.crearProducto(this.producto).subscribe({
      next: () => {
        this.router.navigate(['/catalog']);
      },
      error: () => {
        this.errorMsg = 'Error al publicar el producto. Inténtalo de nuevo.';
        this.enviando = false;
      }
    });
  }
}
