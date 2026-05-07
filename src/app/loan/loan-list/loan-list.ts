import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { LoanEdit } from '../loan-edit/loan-edit';
import { LoanService } from '../loan.service';
import { Loan } from '../model/loan';
import { Pageable } from '../../core/model/page/Pageable';
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation';

import { FormsModule } from '@angular/forms';


import { ClientesService } from '../../clientes/clientes.service';
import { Cliente } from '../../clientes/model/cliente';

import { GameService } from '../../game/game.service';
import { Game } from '../../game/model/Game'
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@Component({
    selector: 'app-loan-list',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    templateUrl: './loan-list.html',
    styleUrl: './loan-list.css',
})
export class LoanListComponent implements OnInit {

    pageNumber = 0;
    pageSize = 5;
    totalElements = 0;

    cliente: Cliente[] = [];
    games: Game[] = [];

    filters = {
        gameId: null,
        clientId: null,
        date: null
    };

    dataSource = new MatTableDataSource<Loan>();
    displayedColumns: string[] = [
        'id',
        'game',
        'client',
        'startDate',
        'endDate',
        'action'
    ];

    constructor(
        private loanService: LoanService,
        public dialog: MatDialog,
        private clientesService: ClientesService,
        private gameService: GameService,

    ) {}

    ngOnInit(): void {
    this.loadPage();

    this.clientesService.getClientes().subscribe(data => {
        this.cliente = data;
    });

    this.gameService.getGames().subscribe(data => {
        this.games = data;
    });
    }


    loadPage(event?: PageEvent) {

        if (event) {
            this.pageNumber = event.pageIndex;
            this.pageSize = event.pageSize;
        }

        
        const formattedDate = this.filters.date
            ? this.filters.date.toISOString().split('T')[0]
            : null;

        this.loanService.getLoans(
            this.pageNumber,
            this.pageSize,
            this.filters.clientId,
            this.filters.gameId,
            formattedDate
        ).subscribe(data => {
            this.dataSource.data = data.content;
            this.totalElements = data.totalElements;
        });
    }

    createLoan() {
        const dialogRef = this.dialog.open(LoanEdit, { data: {} });
        dialogRef.afterClosed().subscribe(() => this.ngOnInit());
    }

    editLoan(loan: Loan) {
        const dialogRef = this.dialog.open(LoanEdit, {
            data: { loan }
        });
        dialogRef.afterClosed().subscribe(() => this.ngOnInit());
    }

    deleteLoan(loan: Loan) {
        const dialogRef = this.dialog.open(DialogConfirmationComponent, {
            data: {
                title: 'Eliminar préstamo',
                description: '¿Desea eliminar el préstamo seleccionado?',
            },
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loanService.deleteLoan(loan.id).subscribe(() => {
                    this.ngOnInit();
                });
            }
        });
    }

    clearFilters() {
        this.filters = { gameId: null, clientId: null, date: null };
        this.loadPage();
    }
}