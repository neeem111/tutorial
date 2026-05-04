import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pageable } from '../core/model/page/Pageable';
import { PaginatedData } from '../core/model/page/PaginatedData';
import { Prestamo } from './model/Prestamo';
import { Game } from '../game/model/Game';
import { Client } from '../client/model/Client';

export interface PrestamoFilter {
    gameId?: number | null;
    clientId?: number | null;
    date?: string | null;
}

@Injectable({ providedIn: 'root' })
export class PrestamosService {
    private readonly http = inject(HttpClient);
    private baseUrl = 'http://localhost:8080/prestamo';

    getPrestamos(pageable: Pageable, filter: PrestamoFilter): Observable<PaginatedData<Prestamo>> {
        return this.http.post<PaginatedData<Prestamo>>(this.baseUrl, {
            pageable,
            ...filter
        });
    }

    savePrestamo(prestamo: Prestamo): Observable<Prestamo> {
        const { id } = prestamo;
        const url = id ? `${this.baseUrl}/${id}` : this.baseUrl;
        return this.http.put<Prestamo>(url, prestamo);
    }

    deletePrestamo(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    getAllGames(): Observable<Game[]> {
        return this.http.get<Game[]>('http://localhost:8080/game');
    }

    getAllClients(): Observable<Client[]> {
        return this.http.get<Client[]>('http://localhost:8080/client');
    }
}