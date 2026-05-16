import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {

  // Servicios inyectados con inject() (forma moderna Angular)
  private productoService = inject(ProductoService);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // El producto que viene del backend (null mientras carga)
  producto: any = null;

  cargando = true;
  error = false;

  // ngOnInit se ejecuta al arrancar el componente
  ngOnInit() {
    // Leemos el parámetro :id de la URL (ej: /product/3 → id = "3")
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.error = true;
      this.cargando = false;
      return;
    }

    this.productoService.getProductoById(Number(id)).subscribe({
      next: (data) => {
        this.producto = data;
        this.cargando = false;
      },
      error: () => {
        this.error = true;
        this.cargando = false;
      }
    });
  }

  // Devuelve true si el usuario autenticado es el vendedor de este producto
  esMiProducto(): boolean {
    return this.authService.getNombre() === this.producto?.vendedor?.nombre;
  }

  // Elimina el producto y redirige al catálogo
  eliminar() {
    this.productoService.eliminarProducto(this.producto.id).subscribe({
      next: () => {
        this.router.navigate(['/catalog']);
      },
      error: () => {
        alert('Error al eliminar el producto.');
      }
    });
  }
}
