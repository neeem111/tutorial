import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Prestamo } from './model/Prestamo';
import { PrestamoPage } from './model/PrestamoPage';

@Injectable({ providedIn: 'root' })
export class PrestamoService {

  getPrestamos(): Observable<PrestamoPage> {
    return of({
      content: [],
      pageable: { pageNumber: 0, pageSize: 10, sort: [] },
      totalElements: 0
    });
  }

  savePrestamo(prestamo: Prestamo): Observable<Prestamo> {
    return of(prestamo);
  }

  deletePrestamo(id: number): Observable<void> {
    return of();
  }
}
