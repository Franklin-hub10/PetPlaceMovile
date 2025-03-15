import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: any[] = [];

  constructor() {}

  agregarProducto(producto: any) {
    let index = this.carrito.findIndex(p => p.id === producto.id);
    if (index !== -1) {
      this.carrito[index].cantidad += 1; // ✅ Incrementa la cantidad si ya existe
    } else {
      this.carrito.push({ ...producto, cantidad: 1 }); // ✅ Agrega nuevo producto con cantidad 1
    }
  }

  obtenerCarrito() {
    return this.carrito;
  }

  actualizarCarrito(nuevoCarrito: any[]) {
    this.carrito = nuevoCarrito;
  }

  limpiarCarrito() {
    this.carrito = [];
  }
}
