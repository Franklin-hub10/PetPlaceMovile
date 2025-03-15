import { Component, OnInit } from '@angular/core';
import { MascotaService } from '../../services/mascota-servicio.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-mascotas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-mascotas.component.html',
  styleUrls: ['./lista-mascotas.component.css']
})
export class ListaMascotasComponent implements OnInit {
  mascotas: any[] = [];
  errorMessage: string = '';
  userRole: string = '';
  userId: number | null = null;

  // **Mascota en edición**
  mascotaEditando: any = null;


  // 📌 Lista de imágenes predeterminadas para asociarlas
  imagenesMascotas: string[] = [
    'https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/160846/french-bulldog-summer-smile-joy-160846.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/57416/cat-sweet-kitty-animals-57416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  ];

    // ✅ **Asociar imagen a cada mascota**
    asignarImagenMascota(index: number): string {
      console.log("📌 Asignando imagen para índice:", index);
      
      if (index === undefined || index < 0) {
        return 'https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1;' // Imagen de respaldo
      }
    
      return this.imagenesMascotas[index % this.imagenesMascotas.length]; 
    }
    
    

  constructor(
    private mascotaService: MascotaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    this.userId = Number(this.authService.getUserId());
  
    if (this.userRole === 'CLIENTE' && this.userId) {
      this.getMascotasPorCliente(this.userId);
    } else {
      this.getTodasMascotas();
    }
  }

  getTodasMascotas(): void {
    this.mascotaService.getTodasMascotas().subscribe({
      next: data => {
        this.mascotas = data;
      },
      error: err => {
        console.error("Error al obtener mascotas:", err);
        this.errorMessage = "Error al obtener mascotas.";
      }
    });
  }

  getMascotasPorCliente(clienteId: number): void {
    this.mascotaService.getMascotasPorCliente(clienteId).subscribe({
      next: data => {
        this.mascotas = data;
      },
      error: err => {
        console.error("Error al obtener mascotas del cliente:", err);
        this.errorMessage = "Error al obtener tus mascotas.";
      }
    });
  }

  // ✅ **Activar edición de una mascota**
  activarEdicion(mascota: any): void {
    console.log("🔍 Editando mascota:", mascota);
    this.mascotaEditando = { ...mascota }; // Clonamos para evitar cambios en tiempo real
  }

  // ✅ **Guardar cambios en la mascota**
  guardarEdicion(): void {
    if (this.mascotaEditando) {
      this.mascotaService.putMascota(this.mascotaEditando.id, this.mascotaEditando).subscribe({
        next: () => {
          const index = this.mascotas.findIndex(m => m.id === this.mascotaEditando.id);
          if (index !== -1) {
            this.mascotas[index] = { ...this.mascotaEditando };
          }
          this.mascotaEditando = null;
        },
        error: err => {
          console.error("Error al actualizar la mascota:", err);
          alert("No se pudo actualizar la mascota.");
        }
      });
    }
  }

  // ❌ **Cancelar edición**
  cancelarEdicion(): void {
    this.mascotaEditando = null;
  }

  eliminarMascota(id: number): void {
    if (confirm("¿Estás seguro de eliminar esta mascota?")) {
      this.mascotaService.deleteMascota(id).subscribe({
        next: () => {
          this.mascotas = this.mascotas.filter(m => m.id !== id);
        },
        error: err => {
          console.error("Error al eliminar la mascota:", err);
          alert("No se pudo eliminar la mascota.");
        }
      });
    }
  }

  isCliente(): boolean {
    return this.userRole === 'CLIENTE';
  }

  isEmpleado(): boolean {
    return this.userRole === 'EMPLEADO';
  }

  isAdmin(): boolean {
    return this.userRole === 'ADMIN';
  }
}
