import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MascotasComponent } from './pages/mascotas/mascotas.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { Pagina404Component } from './pages/pagina404/pagina404.component';
import { ProductosMostrarComponent } from './pages/productos-mostrar/productos-mostrar.component';
import { RegistrarseComponent } from './pages/registrarse/registrarse.component';
import { RegistroProductosComponent } from './pages/registro-productos/registro-productos.component';
import { FormularioMascotaComponent } from './components/formulario-mascota/formulario-mascota.component';
import { ListaMascotasComponent } from './components/lista-mascotas/lista-mascotas.component';
import { FormularioProductoComponent } from './components/formulario-producto/formulario-producto.component';
import { ProductosComponent } from './components/productos/productos.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Ruta por defecto
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'mascotas',
    component: MascotasComponent,
    children: [
      { path: 'registrar', component: FormularioMascotaComponent },
      { path: 'lista', component: ListaMascotasComponent }
    ]
  },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'productosMostrar', component: ProductosMostrarComponent },
  { path: 'productosLista', component: ProductosComponent },
  { path: 'pagina404', component: Pagina404Component },
  { path: 'productos', component: FormularioProductoComponent },
  { path: 'productos-mostrar', component: ProductosMostrarComponent },
  { path: 'registrarse', component: RegistrarseComponent },
  { path: 'registro-productos', component: RegistroProductosComponent },
  { path: '**', redirectTo: '/pagina404' } // Redirección a 404 si no se encuentra la ruta
];
