import { Component, OnInit, inject, signal, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PrestamosService } from '../prestamos.service';
import { Prestamo } from '../model/Prestamo';
import { Game } from '../../game/model/Game';
import { Client } from '../../client/model/Client';

@Component({
    selector: 'app-prestamos-edit',
    templateUrl: './prestamos-edit.html',
    styleUrls: ['./prestamos-edit.css'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ]
})
export class PrestamosEditComponent implements OnInit {
    private readonly service = inject(PrestamosService);
    private readonly dialogRef = inject(MatDialogRef<PrestamosEditComponent>);

    id: number | null = null;
    gameId: number | null = null;
    clientId: number | null = null;
    startDate: Date | null = null;
    endDate: Date | null = null;

    games = signal<Game[]>([]);
    clients = signal<Client[]>([]);

    constructor(@Inject(MAT_DIALOG_DATA) public data: { prestamo?: Prestamo }) {}

    ngOnInit(): void {
        this.service.getAllGames().subscribe(g => this.games.set(g));
        this.service.getAllClients().subscribe(c => this.clients.set(c));

        if (this.data?.prestamo) {
            const p = this.data.prestamo;
            this.id = p.id;
            this.gameId = p.game?.id ?? null;
            this.clientId = p.client?.id ?? null;
            this.startDate = p.startDate ? new Date(p.startDate) : null;
            this.endDate = p.endDate ? new Date(p.endDate) : null;
        }
    }

    onSave(): void {
        // ── Validaciones frontend ──────────────────────────────────
        if (!this.gameId || !this.clientId || !this.startDate || !this.endDate) {
            alert('Todos los campos son obligatorios.');
            return;
        }

        if (this.endDate < this.startDate) {
            alert('La fecha de fin no puede ser anterior a la fecha de inicio.');
            return;
        }

        const diffDays = this.diffInDays(this.startDate, this.endDate);
        if (diffDays > 14) {
            alert('El período máximo de préstamo es de 14 días.');
            return;
        }
        // ──────────────────────────────────────────────────────────

        const prestamo: Prestamo = {
            id: this.id!,
            game: this.games().find(g => g.id === this.gameId)!,
            client: this.clients().find(c => c.id === this.clientId)!,
            startDate: this.formatDate(this.startDate),
            endDate: this.formatDate(this.endDate),
        };

        this.service.savePrestamo(prestamo).subscribe({
            next: () => this.dialogRef.close(true),
            error: err => {
                // El backend devolverá mensajes de error de validación
                const msg = err?.error?.message || 'Error al guardar el préstamo.';
                alert(msg);
            }
        });
    }

    onClose(): void {
        this.dialogRef.close(false);
    }

    private diffInDays(start: Date, end: Date): number {
        const ms = end.getTime() - start.getTime();
        return Math.ceil(ms / (1000 * 60 * 60 * 24));
    }

    private formatDate(date: Date): string {
        return date.toISOString().split('T')[0];
    }
}