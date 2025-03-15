import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormularioProductoComponent } from "./components/formulario-producto/formulario-producto.component";
import { NavComponent } from "./components/nav/nav.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tienda';
}
