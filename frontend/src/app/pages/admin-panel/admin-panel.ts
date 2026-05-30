import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.css',
})
export class AdminPanel implements OnInit {

  private adminService = inject(AdminService);
  private cdr = inject(ChangeDetectorRef);

  pestana: 'usuarios' | 'productos' = 'usuarios';
  usuarios: any[] = [];
  productos: any[] = [];
  cargando = true;

  editandoUsuario: any = null;
  editFormUsuario = { nombre: '', email: '' };

  editandoProducto: any = null;
  editFormProducto = { titulo: '', precio: 0 };

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.cargando = true;
    this.adminService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });

    this.adminService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.cdr.detectChanges();
      },
      error: () => { }
    });
  }

  cambiarPestana(p: 'usuarios' | 'productos') {
    this.pestana = p;
    this.cdr.detectChanges();
  }

  abrirEditarUsuario(u: any) {
    this.editFormUsuario = { nombre: u.nombre, email: u.email };
    this.editandoUsuario = u;
    this.cdr.detectChanges();
  }

  cerrarEditarUsuario() {
    this.editandoUsuario = null;
    this.cdr.detectChanges();
  }

  guardarUsuario() {
    this.adminService.editarUsuario(this.editandoUsuario.id, this.editFormUsuario.nombre, this.editFormUsuario.email).subscribe({
      next: (updated) => {
        const idx = this.usuarios.findIndex(u => u.id === updated.id);
        if (idx !== -1) this.usuarios[idx] = updated;
        this.editandoUsuario = null;
        this.cdr.detectChanges();
      },
      error: () => { }
    });
  }

  abrirEditarProducto(p: any) {
    this.editFormProducto = { titulo: p.titulo, precio: p.precio };
    this.editandoProducto = p;
    this.cdr.detectChanges();
  }

  cerrarEditarProducto() {
    this.editandoProducto = null;
    this.cdr.detectChanges();
  }

  guardarProducto() {
    this.adminService.editarProducto(this.editandoProducto.id, this.editFormProducto.titulo, this.editFormProducto.precio).subscribe({
      next: (updated) => {
        const idx = this.productos.findIndex(p => p.id === updated.id);
        if (idx !== -1) this.productos[idx] = updated;
        this.editandoProducto = null;
        this.cdr.detectChanges();
      },
      error: () => { }
    });
  }

  darDeBaja(id: number) {
    this.adminService.eliminarUsuario(id).subscribe({
      next: () => {
        this.usuarios = this.usuarios.filter(u => u.id !== id);
        this.cdr.detectChanges();
      },
      error: () => { }
    });
  }

  eliminarProducto(id: number) {
    this.adminService.eliminarProducto(id).subscribe({
      next: () => {
        this.productos = this.productos.filter(p => p.id !== id);
        this.cdr.detectChanges();
      },
      error: () => { }
    });
  }
}
