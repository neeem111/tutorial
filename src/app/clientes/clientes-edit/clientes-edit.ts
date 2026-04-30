import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientesService } from '../clientes.service';
import { Cliente } from '../model/cliente';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-clientes-edit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './clientes-edit.html',
  styleUrl: './clientes-edit.css',
})
export class ClientesEditComponent implements OnInit {
  cliente!: Cliente;
  error = false;

  constructor(
    public dialogRef: MatDialogRef<ClientesEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cliente: Cliente },
    private clientesService: ClientesService,
  ) {}

  ngOnInit(): void {
    this.cliente = this.data.cliente ? Object.assign({}, this.data.cliente) : new Cliente();
  }

  onSave() {
  this.clientesService.saveCliente(this.cliente)
    .subscribe({
      next: () => this.dialogRef.close(true),
      error: () => this.error = true
    });
}

  onClose() {
    this.dialogRef.close();
  }
}
