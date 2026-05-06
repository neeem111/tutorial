import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Pageable } from '../core/model/page/Pageable';
import { Loan } from './model/loan';
import { LoanPage } from './model/loanpage';

@Injectable({
    providedIn: 'root',
})
export class LoanService {

    private baseUrl = 'http://localhost:8080/loan';

    constructor(private http: HttpClient) {}

    
        getLoans(
        page: number,
        size: number,
        clientId?: number,
        gameId?: number,
        date?: string
        ) {
        let params: any = {
            page,
            size
        };

        if (clientId) params.clientId = clientId;
        if (gameId) params.gameId = gameId;
        if (date) params.date = date;

        return this.http.get<LoanPage>(this.baseUrl, { params });
        }


    
        saveLoan(loanDto: any): Observable<void> {
        const { id } = loanDto;
        const url = id ? `${this.baseUrl}/${id}` : this.baseUrl;
        return this.http.put<void>(url, loanDto);
        }//usamos un dto para trabajar con date y poder hacer la conversión al formato del backen al guardar


        deleteLoan(id: number): Observable<void> {
            return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}