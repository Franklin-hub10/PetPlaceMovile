import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private API_BASE = 'http://localhost:8080'; // Ajusta según tu entorno
  private API_REGISTRO = `${this.API_BASE}/usuarios/guardar`;
  private API_LOGIN = `${this.API_BASE}/usuarios/login`; 


  constructor(private http: HttpClient) {}

  // 1. Verificar duplicados
  checkDuplicates(usuario: any): Observable<any> {
    // Llama al endpoint /usuarios/check-duplicates
    return this.http.post(`${this.API_BASE}/usuarios/check-duplicates`, usuario);
  }

  // 2. Registrar usuario
  postRegistro(usuario: any): Observable<any> {
    // Tu backend responde con texto, por eso 'responseType: text'
    return this.http.post(this.API_REGISTRO, usuario, { responseType: 'text' });
  }

  // 3. Listar usuarios (opcional)
  getUsuarios(): Observable<any> {
    return this.http.get(`${this.API_BASE}/usuarios`);
  }

  // 4. Hacer login (POST)
  postLogin(usuario: any): Observable<any> {
    return this.http.post(`${this.API_BASE}/usuarios/login`, usuario).pipe(
      tap((response: any) => {
        if (response.success && response.accessToken) {
          console.log("✅ Guardando token en localStorage:", response.accessToken);
          localStorage.setItem("accessToken", response.accessToken);
        } else {
          console.warn("⚠️ No se recibió un token en la respuesta del servidor.");
        }
      })
    );
  }
  


  // 5. Obtener usuario actual desde localStorage
  obtenerUsuarioActual(): any {
    const usuarioString = localStorage.getItem('usuarioActual');
    console.log("🔎 Usuario obtenido de localStorage:", usuarioString);

    if (!usuarioString || usuarioString === "undefined") {
      console.warn("⚠️ No hay usuario guardado en localStorage.");
      return null;
    }

    try {
      return JSON.parse(usuarioString);
    } catch (error) {
      console.error("❌ Error al parsear usuarioActual:", error);
      return null;
    }
  }
}
