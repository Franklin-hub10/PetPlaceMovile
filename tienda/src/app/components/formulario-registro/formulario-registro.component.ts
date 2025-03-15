import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-registro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './formulario-registro.component.html',
  styleUrls: ['./formulario-registro.component.css']
})
export class FormularioRegistroComponent implements OnInit {
  identificacion: string = '';
  nombres: string = '';
  apellidos: string = '';
  contacto: string = '';
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  rol: string = 'CLIENTE'; // Valor por defecto en mayúsculas
  esAdministrador: boolean = false;

  constructor(private servicio: LoginService, private router: Router) {}

  ngOnInit(): void {
    const usuarioActual: any = this.servicio.obtenerUsuarioActual();
    if (usuarioActual && usuarioActual.rol === 'ADMIN') {
      this.esAdministrador = true;
    }
  }

  registro(formularioRegistro: any): void {
    console.log("Se llamó a registro() con:", formularioRegistro);
    
    // Validar contraseñas
    if (this.password !== this.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    
    // Si no hay usuario autenticado, forzamos el rol a CLIENTE
    if (!this.servicio.obtenerUsuarioActual()) {
      this.rol = 'CLIENTE';
    }

    const usuario: any = {
      identificacion: this.identificacion,
      nombres: this.nombres,
      apellidos: this.apellidos,
      contacto: this.contacto,
      username: this.username,
      email: this.email,
      password: this.password,
      rol: this.rol
    };

    console.log("🔹 Verificando duplicados para:", usuario);

    // Primero, se verifica que no existan duplicados
    this.servicio.checkDuplicates(usuario).subscribe({
      next: (res: any) => {
        if (res.duplicate) {
          let mensaje = "";
          switch (res.field) {
            case "username":
              mensaje = "El nombre de usuario ya existe. Por favor, ingresa otro nombre de usuario.";
              break;
            case "email":
              mensaje = "El correo electrónico ya está registrado. Por favor, ingresa otro correo.";
              break;
            case "identificacion":
              mensaje = "La identificación ya está registrada. Por favor, verifica tu número de identificación.";
              break;
            default:
              mensaje = `El campo "${res.field}" ya está en uso.`;
          }
          alert(mensaje);
        } else {
          // Si no hay duplicados, se procede a enviar el registro al backend
          this.enviarRegistro(usuario);
        }
      },
      error: (err: any) => {
        console.error("❌ Error al verificar duplicados:", err);
        alert("Ocurrió un error al verificar duplicados. Intenta más tarde.");
      }
    });
  }

  private enviarRegistro(usuario: any): void {
    console.log("🔹 Enviando al backend:", usuario);

    this.servicio.postRegistro(usuario).subscribe({
      next: (res: any) => {
        console.log("✅ Registro exitoso:", res);
        // Si no hay usuario autenticado (registro de cliente) redirigimos al login
        if (!this.servicio.obtenerUsuarioActual()) {
          alert("Te has registrado exitosamente. Por favor, inicia sesión.");
          this.router.navigate(["/login"]);
        } else {
          // Si ya estás logueado (admin o empleado) permaneces en la misma página
          alert("Usuario registrado exitosamente");
        }
      },
      error: (err: any) => {
        console.error("❌ Error al registrar:", err);
        if (err.error && err.error.message) {
          alert(`Error: ${err.error.message}`);
        } else {
          alert(`Ocurrió un error al registrar el usuario: ${JSON.stringify(err.error)}`);
        }
      }
    });
  }
}
