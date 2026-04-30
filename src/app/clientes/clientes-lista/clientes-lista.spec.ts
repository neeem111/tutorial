import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesListComponent } from './clientes-lista';

describe('ClientesListComponent', () => {
  let component: ClientesListComponent;
  let fixture: ComponentFixture<ClientesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientesListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
