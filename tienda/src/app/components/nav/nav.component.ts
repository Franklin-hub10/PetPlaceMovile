import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormularioMascotaComponent } from "../formulario-mascota/formulario-mascota.component";
import { ListaMascotasComponent } from "../lista-mascotas/lista-mascotas.component";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  menuOpen: boolean = false;
  mascotasSubmenuOpen: boolean = false;
  isAuthenticated: boolean = false;
  userRole: string = '';

  mostrarFormulario: boolean = false;
  mostrarLista: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.updateAuthStatus();
    }
  
    // 🔥 Escuchar evento de logout para actualizar el navbar dinámicamente
    window.addEventListener('authChange', () => {
      this.updateAuthStatus();
    });
  }
  

  updateAuthStatus(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.userRole = this.authService.getUserRole() || '';

    console.log("🔄 Actualizando estado de sesión");
    console.log("✅ Usuario autenticado:", this.isAuthenticated);
    console.log("📌 Rol actualizado:", this.userRole);

    this.cdr.detectChanges();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  toggleMascotasSubmenu(event: Event): void {
    event.preventDefault();
    this.mascotasSubmenuOpen = !this.mascotasSubmenuOpen;
    this.cdr.detectChanges();
  }

  mostrarFormularioMascota(): void {
    this.mostrarFormulario = true;
    this.mostrarLista = false;
    this.mascotasSubmenuOpen = false;
    this.cdr.detectChanges();
  }

  mostrarListaMascotas(): void {
    this.mostrarLista = true;
    this.mostrarFormulario = false;
    this.mascotasSubmenuOpen = false;
    this.cdr.detectChanges();
  }

  isCliente(): boolean {
    return this.userRole.toLowerCase() === 'cliente' || this.userRole.toLowerCase() === 'CLIENTE';
  }

  isEmpleado(): boolean {
    return this.userRole.toLowerCase() === 'empleado' || this.userRole.toLowerCase() === 'EMPLEADO';;
  }

  isAdmin(): boolean {
    return this.userRole.toLowerCase() === 'admin' || this.userRole.toLowerCase() === 'ADMIN';
  }

  logout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
    this.userRole = '';
    this.mascotasSubmenuOpen = false;
    this.mostrarFormulario = false;
    this.mostrarLista = false;
    this.cdr.detectChanges();
    this.router.navigate(['/login']);
  }





  

}