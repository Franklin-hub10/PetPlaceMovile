import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MascotaService } from '../../services/mascota-servicio.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-formulario-mascota',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './formulario-mascota.component.html',
  styleUrls: ['./formulario-mascota.component.css']
})
export class FormularioMascotaComponent implements OnInit {
  nombre: string = '';
  tipo: string = '';
  raza: string = '';
  fechaNacimiento: string = '';
  clienteId: number | null = null;

  constructor(
    private mascotaService: MascotaService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.clienteId = parseInt(this.authService.getUserId(), 10);
    if (!this.clienteId) {
      console.error("⚠️ No se encontró ID del usuario en localStorage.");
    }
  }

  guardarMascota() {
    const clienteId = parseInt(this.authService.getUserId(), 10);
    if (!clienteId) {
      alert("Error: No se encontró el ID del cliente.");
      return;
    }
  
    const nuevaMascota = {
      nombre: this.nombre,
      tipo: this.tipo,
      raza: this.raza,
      fechaNacimiento: this.fechaNacimiento,
      cliente: { id: clienteId }
    };
  
    console.log("📢 JSON enviado a la API:", JSON.stringify(nuevaMascota, null, 2));
  
    this.mascotaService.crearMascota(nuevaMascota).subscribe({
      next: data => {
        console.log("✅ Mascota guardada con éxito:", data);
        alert("Mascota guardada correctamente.");
      },
      error: err => {
        console.error("🚨 Error al guardar mascota:", err);
        alert("Error al guardar la mascota: " + err.message);
      }
    });
  }
}
