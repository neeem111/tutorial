import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamosEdit } from './prestamos-edit';

describe('PrestamosEdit', () => {
  let component: PrestamosEdit;
  let fixture: ComponentFixture<PrestamosEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrestamosEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(PrestamosEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
