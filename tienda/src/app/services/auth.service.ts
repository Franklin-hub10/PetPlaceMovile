import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  login(userData: any): void {
    if (this.isBrowser) {
      console.log("🔹 Respuesta del backend:", userData);

      // 🔥 ELIMINAR DATOS ANTERIORES PARA EVITAR CONFLICTOS
      this.clearAllData();

      // ✅ ALMACENAR NUEVOS DATOS
      localStorage.setItem('accessToken', userData.token);
      localStorage.setItem('usuarioActual', JSON.stringify(userData));

      if (userData.id) {
        localStorage.setItem('id', userData.id.toString());
      }

      if (userData.rol) {
        localStorage.setItem('userRole', userData.rol.toUpperCase()); // 🔥 Convertir a MAYÚSCULAS
      }

      // 🔥 Disparar evento de autenticación para actualizar UI dinámicamente
      window.dispatchEvent(new Event('authChange'));
      this.reloadPage();
    }

  }


  getUserRole(): string {
    if (this.isBrowser) {
      let role = localStorage.getItem('userRole') ?? '';

      if (!role) {
        const usuarioActual = localStorage.getItem('usuarioActual');
        if (usuarioActual) {
          const parsedUser = JSON.parse(usuarioActual);
          role = parsedUser.rol ? String(parsedUser.rol).toUpperCase() : '';
          if (role) {
            localStorage.setItem('userRole', role);
          }
        }
      }

      console.log("📌 Rol obtenido:", role);
      return role;
    }
    return '';
  }



  getUserId(): string {
    if (this.isBrowser) {
      let userId = localStorage.getItem('id') ?? '';
      if (!userId) {
        const usuarioActual = localStorage.getItem('usuarioActual');
        if (usuarioActual) {
          const parsedUser = JSON.parse(usuarioActual);
          userId = parsedUser.id ? String(parsedUser.id) : '';
          if (userId) {
            localStorage.setItem('id', userId);
          }
        }
      }
      return userId;
    }
    return '';
  }

  isAuthenticated(): boolean {
    if (this.isBrowser) {
      return !!localStorage.getItem('accessToken');
    }
    return false;
  }


  
  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('id');
      localStorage.removeItem('usuarioActual');
  
      // 🔥 Disparar evento de cierre de sesión
      window.dispatchEvent(new Event('logout'));
  
      
  }
  
}





private clearAllData(): void {
 console.log("🧹 Limpiando datos almacenados...");
 localStorage.clear();
 sessionStorage.clear();
 document.cookie.split(";").forEach((c) => {
   document.cookie = c
     .replace(/^ +/, "")
     .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
 });
}


reloadPage(): void {
  if (this.isBrowser) {
    window.location.reload();
  }
}
}

