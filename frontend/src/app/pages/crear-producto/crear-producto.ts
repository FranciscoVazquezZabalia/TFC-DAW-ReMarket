import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductoService, Categoria } from '../../services/producto.service';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './crear-producto.html',
  styleUrl: './crear-producto.css'
})
export class CrearProducto implements OnInit {

  private productoService = inject(ProductoService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  categorias: Categoria[] = [];

  producto: any = {
    titulo: '',
    descripcion: '',
    precio: 0,
    estado: '',
    imagenUrl: '',
    categoriaId: null
  };

  enviando = false;
  errorMsg = '';

  ngOnInit() {
    this.productoService.getCategorias().subscribe({
      next: (cats) => {
        this.categorias = cats;
        this.cdr.detectChanges();
      },
      error: (err) => console.log('Error categorias:', err)
    });
  }

  onSubmit() {
    this.enviando = true;
    this.errorMsg = '';

    this.productoService.crearProducto(this.producto).subscribe({
      next: () => {
        this.router.navigate(['/catalog']);
      },
      error: () => {
        this.enviando = false;
        this.errorMsg = 'Error al publicar el producto. Inténtalo de nuevo.';
        this.cdr.detectChanges();
      }
    });
  }
}
