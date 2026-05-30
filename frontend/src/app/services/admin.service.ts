import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private http = inject(HttpClient);
  private adminUrl = 'http://localhost:8080/api/admin';
  private productosUrl = 'http://localhost:8080/api/productos';

  getUsuarios() {
    return this.http.get<any[]>(`${this.adminUrl}/usuarios`);
  }

  editarUsuario(id: number, nombre: string, email: string) {
    return this.http.put<any>(`${this.adminUrl}/usuarios/${id}`, { nombre, email });
  }

  eliminarUsuario(id: number) {
    return this.http.delete<void>(`${this.adminUrl}/usuarios/${id}`);
  }

  getProductos() {
    return this.http.get<any[]>(this.productosUrl);
  }

  editarProducto(id: number, titulo: string, precio: number) {
    return this.http.put<any>(`${this.adminUrl}/productos/${id}`, { titulo, precio });
  }

  eliminarProducto(id: number) {
    return this.http.delete<void>(`${this.adminUrl}/productos/${id}`);
  }
}
