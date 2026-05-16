import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Producto {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria?: string;
  imagen?: string;
  vendedorEmail?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/productos';

  getProductos() {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  getProductoById(id: number) {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }
  crearProducto(producto: Producto) {
    return this.http.post<Producto>(this.apiUrl, producto);
  }

  eliminarProducto(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
