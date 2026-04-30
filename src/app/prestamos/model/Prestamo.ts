import { Cliente } from "../../clientes/model/cliente";
import { Game } from "../../game/model/Game";

export class Prestamo {
  id?: number;
  game!: Game;
  client!: Cliente;
  dateStart!: Date;
  dateEnd!: Date;
}