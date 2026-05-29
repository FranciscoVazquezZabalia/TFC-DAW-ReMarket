import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductoService, Producto } from '../../services/producto.service';
import { AuthService, UsuarioPerfil } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {

  private productoService = inject(ProductoService);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  usuario: UsuarioPerfil | null = null;
  productos: Producto[] = [];
  cargando = true;

  ngOnInit() {
    this.authService.getMiPerfil().subscribe({
      next: (u) => {
        this.usuario = u;
        this.cdr.detectChanges();
      },
      error: () => {
        this.cdr.detectChanges();
      }
    });

    this.productoService.getMisProductos().subscribe({
      next: (prods) => {
        this.productos = prods;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }
}
