import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  private API_MASCOTAS = 'http://localhost:8080/mascotas';

  constructor(private http: HttpClient) {}

  getTodasMascotas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_MASCOTAS}/all`)
      .pipe(catchError(this.handleError));
  }

  getMascotasPorCliente(clienteId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_MASCOTAS}/cliente/${clienteId}`)
      .pipe(catchError(this.handleError));
  }

  crearMascota(mascota: any): Observable<any> {
    console.log("📢 Enviando mascota al backend:", mascota);
    return this.http.post(`${this.API_MASCOTAS}/crear`, mascota)
      .pipe(catchError(this.handleError));
  }

  putMascota(id: number, mascota: any): Observable<any> {
    return this.http.put(`${this.API_MASCOTAS}/editar/${id}`, mascota)
      .pipe(catchError(this.handleError));
  }

  deleteMascota(id: number): Observable<any> {
    return this.http.delete(`${this.API_MASCOTAS}/eliminar/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error("❌ Error en la solicitud HTTP:", error);
    return throwError(() => new Error(error.error?.message || 'Error desconocido en la API'));
  }
}
