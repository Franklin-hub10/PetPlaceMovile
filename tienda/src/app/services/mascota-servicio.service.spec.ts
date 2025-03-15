import { TestBed } from '@angular/core/testing';

import { MascotaServicioService } from './mascota-servicio.service';

describe('MascotaServicioService', () => {
  let service: MascotaServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MascotaServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
