import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { PrestamosService, PrestamoFilter } from '../prestamos.service';
import { Prestamo } from '../model/Prestamo';
import { Game } from '../../game/model/Game';
import { Client } from '../../client/model/Client';
import { PrestamosEditComponent } from '../prestamos-edit/prestamos-edit';

@Component({
    selector: 'app-prestamos-list',
    templateUrl: './prestamos-list.html',
    styleUrls: ['./prestamos-list.css'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
    ]
})
export class PrestamosListPage implements OnInit {
    private readonly service = inject(PrestamosService);
    private readonly dialog = inject(MatDialog);

    displayedColumns: string[] = ['id', 'game', 'client', 'startDate', 'endDate', 'action'];
    dataSource: Prestamo[] = [];
    totalElements = 0;
    pageSize = 5;
    pageNumber = 0;

    // Filtros
    filterGameId: number | null = null;
    filterClientId: number | null = null;
    filterDate: Date | null = null;

    games = signal<Game[]>([]);
    clients = signal<Client[]>([]);

    ngOnInit(): void {
        this.loadPage();
        this.service.getAllGames().subscribe(g => this.games.set(g));
        this.service.getAllClients().subscribe(c => this.clients.set(c));
    }

    loadPage(event?: PageEvent): void {
        if (event) {
            this.pageNumber = event.pageIndex;
            this.pageSize = event.pageSize;
        }

        const filter: PrestamoFilter = {
            gameId: this.filterGameId,
            clientId: this.filterClientId,
            date: this.filterDate ? this.formatDate(this.filterDate) : null
        };

        const pageable = {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            sort: [{ property: 'id', direction: 'ASC' }]
        };

        this.service.getPrestamos(pageable, filter).subscribe(page => {
            this.dataSource = page.content;
            this.totalElements = page.totalElements;
        });
    }

    onSearch(): void {
        this.pageNumber = 0;
        this.loadPage();
    }

    onCleanFilter(): void {
        this.filterGameId = null;
        this.filterClientId = null;
        this.filterDate = null;
        this.pageNumber = 0;
        this.loadPage();
    }

    createPrestamo(): void {
        const dialogRef = this.dialog.open(PrestamosEditComponent, {
            data: {},
            width: '500px'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) this.loadPage();
        });
    }

    editPrestamo(prestamo: Prestamo): void {
        const dialogRef = this.dialog.open(PrestamosEditComponent, {
            data: { prestamo },
            width: '500px'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) this.loadPage();
        });
    }

    deletePrestamo(prestamo: Prestamo): void {
        if (confirm(`¿Eliminar préstamo #${prestamo.id}?`)) {
            this.service.deletePrestamo(prestamo.id).subscribe(() => this.loadPage());
        }
    }

    private formatDate(date: Date): string {
        return date.toISOString().split('T')[0]; // yyyy-MM-dd
    }
}