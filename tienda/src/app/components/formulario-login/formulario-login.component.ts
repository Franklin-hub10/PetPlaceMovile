import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';

// Asignamos RouterModule a una constante para que sea estáticamente analizable
const ROUTER_MODULE = RouterModule;

@Component({
  selector: 'app-formulario-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ROUTER_MODULE],
  templateUrl: './formulario-login.component.html',
  styleUrls: ['./formulario-login.component.css']
})
export class FormularioLoginComponent {
  email: any;
  password: any;
  isBrowser: boolean;

  constructor(
    private servicio: LoginService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  login(formulario: any) {
    console.log("🔹 Enviando credenciales:", formulario.value);
  
    const credenciales = {
      email: this.email,
      password: this.password
    };
  
    this.servicio.postLogin(credenciales).subscribe({
      next: (acceso: any) => {
        console.log("✅ Respuesta del servidor:", acceso);
        if (acceso.accessToken && acceso.user) {
          if (this.isBrowser) {
            localStorage.setItem("login", "true");
            localStorage.setItem("usuarioActual", JSON.stringify(acceso.user));
            
            // 🔥 Emitir evento para actualizar el navbar dinámicamente
            window.dispatchEvent(new Event('authChange'));
          }
          console.log("🔹 Usuario almacenado en localStorage:", acceso.user);
          this.router.navigate(['/home']);
        } else {
          console.warn("⚠️ No se recibió un usuario en la respuesta del backend.");
          alert("Error en la autenticación.");
        }
      },
      error: (err: any) => {
        console.error("❌ Error en login:", err);
        alert("Error al iniciar sesión. Verifica tus credenciales.");
      }
    });
  
  }
}  
