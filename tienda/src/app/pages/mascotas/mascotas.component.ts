import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-mascotas',
  standalone:true,
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.css'],
  imports: [ CommonModule,RouterOutlet]
})
export class MascotasComponent implements OnInit {
  isAdmin = false;
  isCliente = false;
  isEmpleado = false;
  
  showFormulario = false;
  showLista = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const role = this.authService.getUserRole();
    this.isAdmin = role === 'ADMIN';
    this.isCliente = role === 'CLIENTE';
    this.isEmpleado = role === 'EMPLEADO';

    this.showLista = true;
  }

  showRegistration(): void {
    this.showFormulario = true;
    this.showLista = false;
  }

  showList(): void {
    this.showFormulario = false;
    this.showLista = true;
  }
}
