import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Importa CommonModule para usar currency pipe
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [CommonModule], // ✅ Importa CommonModule si es standalone
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {
  carrito: any[] = [];
  subtotal: number = 0;
  iva: number = 0;
  total: number = 0;
  compraExitosa: boolean = false;

  constructor(private carritoService: CarritoService) {}

  ngOnInit() {
    this.obtenerFactura();
  }

  obtenerFactura() {
    this.carrito = this.carritoService.obtenerCarrito();
    this.calcularTotales();
  }

  calcularTotales() {
    this.subtotal = this.carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    this.iva = this.subtotal * 0.12;
    this.total = this.subtotal + this.iva;
  }

  eliminarProducto(index: number) {
    this.carrito.splice(index, 1);
    this.carritoService.actualizarCarrito(this.carrito);
    this.calcularTotales();
  }
  finalizarCompra() {
    this.compraExitosa = true; // ✅ Muestra el mensaje de compra exitosa
    setTimeout(() => {
      this.compraExitosa = false;
      this.limpiarFactura();
    }, 3000); // ✅ Oculta el mensaje después de 3 segundos
  }

  limpiarFactura() {
    this.carritoService.limpiarCarrito();
    this.carrito = [];
    this.subtotal = 0;
    this.iva = 0;
    this.total = 0;
  }

}
