import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  producto:any=[]=[];
  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get<any[]>('assets/productos.json').subscribe(data => {
      this.producto = data;
    });
  }
}
