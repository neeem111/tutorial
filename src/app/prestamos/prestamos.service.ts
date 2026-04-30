import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Loan } from './model/Loan';
import { LoanPage } from './model/LoanPage';

@Injectable({ providedIn: 'root' })
export class LoanService {

  getLoans(): Observable<LoanPage> {
    return of({
      content: [],
      pageable: { pageNumber: 0, pageSize: 10, sort: [] },
      totalElements: 0
    });
  }

  saveLoan(loan: Loan): Observable<Loan> {
    return of(loan);
  }

  deleteLoan(id: number): Observable<void> {
    return of();
  }
}
