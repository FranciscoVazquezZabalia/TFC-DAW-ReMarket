import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {
  private productoService = inject(ProductoService);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  producto: any = null;
  cargando = true;
  error = false;
  esFavorito = false;

  mostrarModal = false;
  procesando = false;
  compraRealizada = false;
  errorPago = '';

  tarjeta = { nombre: '', numero: '', caducidad: '', cvv: '' };

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.error = true;
      this.cargando = false;
      return;
    }

    this.productoService.getProductoById(Number(id)).subscribe({
      next: (data) => {
        this.producto = data;
        const favs: number[] = JSON.parse(localStorage.getItem('favoritos') ?? '[]');
        this.esFavorito = favs.includes(data.id!);
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = true;
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  abrirModal() {
    this.tarjeta = { nombre: '', numero: '', caducidad: '', cvv: '' };
    this.procesando = false;
    this.compraRealizada = false;
    this.errorPago = '';
    this.mostrarModal = true;
    this.cdr.detectChanges();
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.cdr.detectChanges();
  }

  pagar() {
    this.procesando = true;
    this.errorPago = '';
    this.cdr.detectChanges();

    setTimeout(() => {
      this.productoService.crearTransaccion(this.producto.id).subscribe({
        next: () => {
          this.procesando = false;
          this.compraRealizada = true;
          this.producto.estadoVenta = 'vendido';
          this.cdr.detectChanges();
        },
        error: () => {
          this.procesando = false;
          this.errorPago = 'Error al procesar el pago. Inténtalo de nuevo.';
          this.cdr.detectChanges();
        }
      });
    }, 2000);
  }

  toggleFavorito() {
    const favs: number[] = JSON.parse(localStorage.getItem('favoritos') ?? '[]');
    const idx = favs.indexOf(this.producto.id);
    if (idx === -1) {
      favs.push(this.producto.id);
    } else {
      favs.splice(idx, 1);
    }
    localStorage.setItem('favoritos', JSON.stringify(favs));
    this.esFavorito = !this.esFavorito;
    this.cdr.detectChanges();
  }

  esMiProducto(): boolean {
    return this.authService.getNombre() === this.producto?.vendedorNombre;
  }

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
