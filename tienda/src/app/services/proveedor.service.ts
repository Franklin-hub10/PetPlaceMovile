import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private http: HttpClient) { }
    private API_PROVEEDORES = 'http://localhost:8080/proveedores'; // Ruta para proveedores

    // Obtener lista de proveedores
    getProveedores(): Observable<any[]> {
      return this.http.get<any[]>(this.API_PROVEEDORES).pipe(
        tap(data => console.log("Proveedores obtenidos:", data)) // Verifica la estructura
      );
    }
  }
