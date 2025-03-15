import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ProductoService } from '../../services/producto.service';
import { AuthService } from '../../services/auth.service';
import { PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {
  productos: any[] = [];   // 📌 Lista de productos
  productoEditando: any | null = null; // 📌 Producto en edición
  isAuthenticated: boolean = false; // 📌 Estado de autenticación
  userRole: string = ''; // 📌 Rol del usuario autenticado

  constructor(
    private productoService: ProductoService,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.updateAuthStatus();
    }
    this.cargarProductos();  // 📌 Cargar productos al iniciar
  }

  /**
   * 🔄 Actualiza el estado de autenticación y el rol del usuario
   */
  updateAuthStatus(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.userRole = this.authService.getUserRole() || '';

    console.log("🔄 Estado de sesión actualizado");
    console.log("✅ Usuario autenticado:", this.isAuthenticated);
    console.log("📌 Rol:", this.userRole);

    this.cdr.detectChanges();
  }

  /**
   * 📌 Cargar productos desde la API
   */
  cargarProductos(): void {
    this.productoService.getProductos().subscribe(
      (productos) => {
        console.log("📌 Productos obtenidos:", productos);
        this.productos = productos;
      },
      (error) => {
        console.error("❌ Error al obtener productos:", error);
      }
    );
  }

  /**
   * ✏️ Activar edición de un producto
   */
  activarEdicion(producto: any): void {
    this.productoEditando = { ...producto };
  }

  /**
   * ❌ Cancelar edición
   */
  cancelarEdicion(): void {
    this.productoEditando = null;
  }

  /**
   * ✅ Guardar cambios en un producto editado
   */
  guardarEdicion(): void {
    if (this.productoEditando) {
      this.productoService.actualizarProducto(this.productoEditando.id, this.productoEditando).subscribe(
        () => {
          console.log("✅ Producto actualizado:", this.productoEditando);
          this.cargarProductos();
          this.productoEditando = null;
        },
        (error) => {
          console.error("❌ Error al actualizar producto:", error);
        }
      );
    }
  }

  /**
   * 🗑️ Eliminar un producto
   */
  eliminarProducto(id: number): void {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      this.productoService.eliminarProducto(id).subscribe(
        () => {
          console.log("🗑️ Producto eliminado con ID:", id);
          this.cargarProductos();
        },
        (error) => {
          console.error("❌ Error al eliminar producto:", error);
        }
      );
    }
  }

  /**
   * 📦 Aumentar stock de un producto
   */
  aumentarStock(id: number, cantidad: number): void {
    this.productoService.aumentarStock(id, cantidad).subscribe(
      () => {
        console.log(`📦 Stock aumentado en ${cantidad} unidades para el producto ID: ${id}`);
        this.cargarProductos();
      },
      (error) => {
        console.error("❌ Error al aumentar stock:", error);
      }
    );
  }

  /**
   * 🔍 Métodos para verificar roles
   */
  isCliente(): boolean {
    return this.userRole.toLowerCase() === 'cliente';
  }

  isEmpleado(): boolean {
    return this.userRole.toLowerCase() === 'empleado';
  }

  isAdmin(): boolean {
    return this.userRole.toLowerCase() === 'admin';
  }
}
