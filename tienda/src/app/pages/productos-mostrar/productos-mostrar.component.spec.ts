import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosMostrarComponent } from './productos-mostrar.component';

describe('ProductosMostrarComponent', () => {
  let component: ProductosMostrarComponent;
  let fixture: ComponentFixture<ProductosMostrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosMostrarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductosMostrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
