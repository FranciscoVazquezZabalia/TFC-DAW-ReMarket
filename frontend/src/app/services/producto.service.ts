import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

export interface Producto {
  id?: number;
  titulo: string;
  descripcion: string;
  precio: number;
  estado?: string;
  imagenUrl?: string;
  fechaPublicacion?: string;
  estadoVenta?: string;
  vendedorId?: number;
  vendedorNombre?: string;
  categoriaId?: number;
  categoriaNombre?: string;
}

export interface Categoria {
  id: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/productos';
  private categoriasUrl = 'http://localhost:8080/api/categorias';

  getProductos() {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  buscarProductos(q?: string, categoriaId?: number) {
    let params = new HttpParams();
    if (q && q.trim()) params = params.set('q', q.trim());
    if (categoriaId != null) params = params.set('categoriaId', categoriaId.toString());
    return this.http.get<Producto[]>(this.apiUrl, { params });
  }

  getCategorias() {
    return this.http.get<Categoria[]>(this.categoriasUrl);
  }

  getProductoById(id: number) {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  crearProducto(producto: Producto) {
    return this.http.post<Producto>(this.apiUrl, producto);
  }

  getMisProductos() {
    return this.http.get<Producto[]>('http://localhost:8080/api/usuarios/me/productos');
  }

  crearTransaccion(productoId: number) {
    return this.http.post<any>('http://localhost:8080/api/transacciones', { productoId });
  }

  eliminarProducto(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
