import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from './auth.service'; // 📌 Importamos AuthService para obtener el token

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private API_PRODUCTOS = 'http://localhost:8080/productos';

  constructor(private http: HttpClient, private authService: AuthService) {}

  /**
   * 🔑 Genera los headers con el token de autenticación
   */
  private obtenerHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken'); // 🔥 Obtener el token almacenado
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`); // 🔑 Enviar token solo si existe
    }
    
    return headers;
  }

  /**
   * 📌 Obtener todos los productos
   */
  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_PRODUCTOS}/all`, { headers: this.obtenerHeaders() }).pipe(
      tap(data => console.log("📌 Productos obtenidos:", data)),
      catchError(error => this.manejarError(error))
    );
  }

  /**
   * 📌 Guardar un producto
   */
  postProductos(producto: any): Observable<any> {
    return this.http.post(`${this.API_PRODUCTOS}/guardar`, producto, { headers: this.obtenerHeaders() }).pipe(
      tap(response => console.log("✅ Producto guardado:", response)),
      catchError(error => this.manejarError(error))
    );
  }

  /**
   * 📌 Actualizar un producto
   */
  actualizarProducto(id: number, producto: any): Observable<any> {
    return this.http.put(`${this.API_PRODUCTOS}/actualizar/${id}`, producto, { headers: this.obtenerHeaders() }).pipe(
      tap(response => console.log("🔄 Producto actualizado:", response)),
      catchError(error => this.manejarError(error))
    );
  }

  /**
   * 📌 Eliminar un producto
   */
  eliminarProducto(id: number): Observable<any> {
    return this.http.delete(`${this.API_PRODUCTOS}/eliminar/${id}`, { headers: this.obtenerHeaders() }).pipe(
      tap(() => console.log(`🗑️ Producto eliminado con ID: ${id}`)),
      catchError(error => this.manejarError(error))
    );
  }

  /**
   * 📌 Aumentar stock de un producto
   */
  aumentarStock(id: number, cantidad: number): Observable<any> {
    return this.http.put(`${this.API_PRODUCTOS}/stock/${id}/${cantidad}`, {}, { headers: this.obtenerHeaders() }).pipe(
      tap(() => console.log(`📦 Stock aumentado en ${cantidad} unidades para el producto ID: ${id}`)),
      catchError(error => this.manejarError(error))
    );
  }

  /**
   * ⚠️ Manejo de errores global para todas las solicitudes HTTP
   */
  private manejarError(error: any): Observable<never> {
    console.error("❌ Error en la API:", error);
    return throwError(() => new Error(error.message || 'Error desconocido en la API'));
  }
}
