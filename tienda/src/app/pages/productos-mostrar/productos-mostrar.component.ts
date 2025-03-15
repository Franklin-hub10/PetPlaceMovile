import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-productos-mostrar',
  standalone: true,
  templateUrl: './productos-mostrar.component.html',
  styleUrl: './productos-mostrar.component.css'
})
export class ProductosMostrarComponent implements OnInit {
  productos: any[] = [];
  carrito: any[] = [];
  subtotal: number = 0;
  iva: number = 0;
  total: number = 0;

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  /**
   * 📌 Cargar productos desde la API
   */
/**
 * 📌 Cargar productos desde la API
 */
cargarProductos(): void {
  this.productoService.getProductos().subscribe(
      (productos) => {
          console.log("📌 Productos obtenidos:", productos);
          this.productos = productos.map(p => ({
              ...p, 
              cantidad: 0, 
              imagen: p.url // Asigna la URL de la base de datos a la imagen
          })); 
      },
      (error) => {
          console.error("❌ Error al obtener productos:", error);
      }
  );
}

  /**
   * ➕ Aumentar cantidad de un producto
   */
  aumentarCantidad(producto: any): void {
    producto.cantidad++;
  }

  /**
   * ➖ Disminuir cantidad de un producto
   */
  disminuirCantidad(producto: any): void {
    if (producto.cantidad > 0) {
      producto.cantidad--;
    }
  }

  /**
   * 🛒 Agregar producto al carrito
   */
  agregarCarrito(producto: any): void {
    if (producto.cantidad > 0) {
        let productoExistente = this.carrito.find(p => p.id === producto.id);
        if (productoExistente) {
            productoExistente.cantidad += producto.cantidad;
        } else {
            this.carrito.push({ ...producto, url: producto.url }); // Asigna la URL de la base de datos
        }
        this.actualizarTotales();
        document.getElementById("modalFactura")!.classList.remove("hidden");
    } else {
        alert("Debe agregar al menos un producto antes de comprar.");
    }
}


  /**
   * 💰 Actualizar totales de la compra
   */
  actualizarTotales(): void {
    this.subtotal = this.carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
    this.iva = this.subtotal * 0.15;
    this.total = this.subtotal + this.iva;
  }

  /**
   * ❌ Cerrar modal de factura
   */
  cerrarModal(): void {
    document.getElementById("modalFactura")!.classList.add("hidden");
  }

  /**
   * ✅ Confirmar compra
   */
  confirmarCompra(): void {
    document.getElementById("modalFactura")!.classList.add("hidden");
    document.getElementById("mensajeExito")!.classList.remove("hidden");
    this.carrito = [];
  }

  /**
   * ❌ Cerrar mensaje de compra exitosa
   */
  cerrarMensajeExito(): void {
    document.getElementById("mensajeExito")!.classList.add("hidden");
  }
}
