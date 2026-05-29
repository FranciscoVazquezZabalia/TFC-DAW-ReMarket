import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ProductoService, Producto, Categoria } from '../../services/producto.service';
import { AuthService } from '../../services/auth.service';

interface GrupoCategoria {
  nombre: string;
  productos: Producto[];
}

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
})
export class Catalog implements OnInit {

  productoService = inject(ProductoService);
  authService = inject(AuthService);
  router = inject(Router);

  featuredImages = [
    'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80'
  ];

  categorias: Categoria[] = [];
  grupos: GrupoCategoria[] = [];
  cargando = true;
  error = false;
  filtroQ = '';
  filtroCategoriaId: number | null = null;

  ngOnInit() {
    this.productoService.getCategorias().subscribe({
      next: (cats) => { this.categorias = cats; },
      error: () => {}
    });
    this.cargarProductos();
  }

  cargarProductos() {
    this.cargando = true;
    this.error = false;
    this.productoService.buscarProductos(this.filtroQ, this.filtroCategoriaId ?? undefined).subscribe({
      next: (productos) => {
        this.grupos = this.agruparPorCategoria(productos);
        this.cargando = false;
      },
      error: () => {
        this.error = true;
        this.cargando = false;
      }
    });
  }

  buscar() {
    this.cargarProductos();
  }

  seleccionarCategoria(id: number | null) {
    this.filtroCategoriaId = id;
    this.cargarProductos();
  }

  private agruparPorCategoria(productos: Producto[]): GrupoCategoria[] {
    const mapa = new Map<string, Producto[]>();
    for (const p of productos) {
      const clave = p.categoriaNombre ?? 'Sin categoría';
      if (!mapa.has(clave)) mapa.set(clave, []);
      mapa.get(clave)!.push(p);
    }
    return Array.from(mapa.entries()).map(([nombre, prods]) => ({ nombre, productos: prods }));
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
