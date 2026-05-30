import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProductoService, Producto } from '../../services/producto.service';
import { AuthService, UsuarioPerfil } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {

  private productoService = inject(ProductoService);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  usuario: UsuarioPerfil | null = null;
  productos: Producto[] = [];
  favoritos: Producto[] = [];
  cargando = true;
  cargandoFavoritos = true;
  pestana: 'anuncios' | 'favoritos' = 'anuncios';

  mostrarModalEditar = false;
  guardando = false;
  errorEditar = '';
  editForm = { nombre: '', email: '', password: '', repetirPassword: '' };

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

    this.cargarFavoritos();
  }

  abrirModalEditar() {
    this.editForm = { nombre: this.usuario?.nombre ?? '', email: this.usuario?.email ?? '', password: '', repetirPassword: '' };
    this.errorEditar = '';
    this.guardando = false;
    this.mostrarModalEditar = true;
    this.cdr.detectChanges();
  }

  cerrarModalEditar() {
    this.mostrarModalEditar = false;
    this.cdr.detectChanges();
  }

  guardarPerfil() {
    if (this.editForm.password && this.editForm.password !== this.editForm.repetirPassword) {
      this.errorEditar = 'Las contraseñas no coinciden.';
      this.cdr.detectChanges();
      return;
    }
    this.guardando = true;
    this.errorEditar = '';
    this.cdr.detectChanges();

    this.authService.actualizarPerfil(this.editForm.nombre, this.editForm.email, this.editForm.password || undefined).subscribe({
      next: (u) => {
        this.usuario = u;
        this.guardando = false;
        this.mostrarModalEditar = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.guardando = false;
        this.errorEditar = 'No se pudo guardar. El email puede estar en uso.';
        this.cdr.detectChanges();
      }
    });
  }

  cargarFavoritos() {
    const ids: number[] = JSON.parse(localStorage.getItem('favoritos') ?? '[]');
    if (ids.length === 0) {
      this.favoritos = [];
      this.cargandoFavoritos = false;
      this.cdr.detectChanges();
      return;
    }
    forkJoin(
      ids.map(id => this.productoService.getProductoById(id).pipe(catchError(() => of(null))))
    ).subscribe({
      next: (prods) => {
        this.favoritos = prods.filter((p): p is Producto => p !== null);
        this.cargandoFavoritos = false;
        this.cdr.detectChanges();
      }
    });
  }

  cambiarPestana(p: 'anuncios' | 'favoritos') {
    this.pestana = p;
    this.cdr.detectChanges();
  }
}
