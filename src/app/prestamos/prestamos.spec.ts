import { TestBed } from '@angular/core/testing';

import { Prestamos } from './prestamos.service';

describe('Prestamos', () => {
  let service: Prestamos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Prestamos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
