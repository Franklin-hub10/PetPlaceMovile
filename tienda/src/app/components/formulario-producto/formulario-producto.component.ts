import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-producto',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './formulario-producto.component.html',
  styleUrl: './formulario-producto.component.css'
})
export class FormularioProductoComponent implements OnInit {

  nombre: string = '';
  descripcion: string = '';
  precio: number = 0;
  stock: number = 0;

  constructor(
    private servicio: ProductoService,
    private route: Router
  ) {}

  ngOnInit() {}

  guardar(formulario: any) {
    const productoAGuardar = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      precio: this.precio,
      stock: this.stock
    };

    console.log("📌 Producto a guardar:", productoAGuardar);

    this.servicio.postProductos(productoAGuardar).subscribe(() => {
      console.log("✅ Producto guardado correctamente", productoAGuardar);
      // Redirigir o limpiar el formulario después del guardado exitoso
      this.route.navigate(['/productos']);
    });
  }
}
