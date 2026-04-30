import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Cliente } from './model/cliente';

@Injectable({
providedIn: 'root'
})
export class ClientesService {
    constructor(private http: HttpClient) {}

    private baseUrl = 'http://localhost:8080/cliente';

    getClientes(): Observable<Cliente[]> {
        return this.http.get<Cliente[]>(this.baseUrl);
    }

    saveCliente(cliente: Cliente): Observable<Cliente> {
        const { id } = cliente;
        const url = id ? `${this.baseUrl}/${id}` : this.baseUrl;
        return this.http.put<Cliente>(url, cliente);
    }

    deleteCliente(idCliente : number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${idCliente}`);
    }  
}