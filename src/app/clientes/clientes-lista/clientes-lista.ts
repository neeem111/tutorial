import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Cliente } from '../model/cliente';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ClientesService } from '../clientes.service';
import { MatDialog } from '@angular/material/dialog';
import { ClientesEditComponent } from '../clientes-edit/clientes-edit';
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-clientes-list',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTableModule, CommonModule],
  templateUrl: './clientes-lista.html',
  styleUrl: './clientes-lista.css',
})
export class ClientesListComponent implements OnInit {
  dataSource = new MatTableDataSource<Cliente>();
  displayedColumns: string[] = ['id', 'name', 'action'];

  constructor(
    private clientesService: ClientesService,
    public dialog: MatDialog,
  ) {}
  createCliente() {
    const dialogRef = this.dialog.open(ClientesEditComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }
  ngOnInit(): void {
    this.clientesService
      .getClientes()
      .subscribe((clientes) => (this.dataSource.data = clientes));
  }
  editCliente(cliente: Cliente) {
    const dialogRef = this.dialog.open(ClientesEditComponent, {
      data: { cliente },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }
  deleteCliente(cliente: Cliente) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: {
        title: 'Eliminar cliente',
        description:
          'Atención si borra el cliente se perderán sus datos.<br> ¿Desea eliminar el cliente?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.clientesService.deleteCliente(cliente.id).subscribe((result) => {
          this.ngOnInit();
        });
      }
    });
  }
}
