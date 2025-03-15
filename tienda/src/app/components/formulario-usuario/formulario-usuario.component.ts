import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario-usuario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.css']
})
export class FormularioUsuarioComponent {

  constructor(private servicio: UsuarioService) {}

  nombre: string = '';
  email: string = '';

  guardar(formulario: any) {
    // Opción 1: Usar formulario.value
    // this.servicio.postUsuarios(formulario.value)

    // Opción 2: Usar las propiedades del componente (nombre, email)
    // y armar tu objeto a guardar
    const usuario = {
      nombre: this.nombre,
      email: this.email
    };

    this.servicio.postUsuarios(usuario).subscribe({
      next: (res) => {
        // Maneja la respuesta exitosa
        console.log('Usuario guardado', res);
      
        window.location.reload();
        formulario.reset();
      },
      error: (err) => {
        // Maneja el error
        console.error('Error al guardar el usuario:', err);
      }
    });
  }
}
