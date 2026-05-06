import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { LoanService } from '../loan.service';
import { Loan } from '../model/loan';

import { ClientesService } from '../../clientes/clientes.service';
import { Cliente } from '../../clientes/model/cliente';


import { GameService } from '../../game/game.service';
import { Game } from '../../game/model/Game';

import { CommonModule } from '@angular/common';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NativeDateAdapter } from '@angular/material/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@Component({
    selector: 'app-loan-edit',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatDatepickerModule,     
        MatNativeDateModule,
        MatButtonModule,
        MatSnackBarModule
    ],
    
    providers: [
        provideNativeDateAdapter() //sirve para adaptar fechas en el picker de fechas
    ],

    templateUrl: './loan-edit.html',
    styleUrl: './loan-edit.css',
})
export class LoanEdit implements OnInit {

    loan!: Loan;
    clientes: Cliente[] = [];
    games: Game[] = [];

    constructor(
        public dialogRef: MatDialogRef<LoanEdit>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private loanService: LoanService,
        private clientesService: ClientesService ,
        private gameService: GameService,
        private snackBar: MatSnackBar
    ) {}


    
    ngOnInit(): void {
        this.loan = this.data.loan
            ? Object.assign({}, this.data.loan)
            : new Loan();

        this.clientesService.getClientes().subscribe(data => {
            console.log('CLIENTES RECIBIDOS:', data); 
            this.clientes = data;
        });
        
        this.gameService.getGames().subscribe(data => {
                console.log('JUEGOS RECIBIDOS:', data);  
                this.games = data;
            });

    }


    
    onSave() {
    const payload = {
        ...this.loan,
        startDate: this.toLocalDate(this.loan.startDate),
        endDate: this.toLocalDate(this.loan.endDate)
    };
    this.loanService.saveLoan(payload).subscribe({
    next: () => {
        this.dialogRef.close();
    },
    error: (err) => {
        const message = err?.error?.message || 'No se guardo el préstamo';
        
        this.snackBar.open(message, 'Cerrar', {
            duration: 5000,
            panelClass: ['error-snackbar'],
            });
        }
        });
    }
    private toLocalDate(date: Date | null): string | null {
    return date ? date.toISOString().split('T')[0] : null;
    }
    onClose() {
        this.dialogRef.close();
    }
}