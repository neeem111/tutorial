import { Prestamo } from "./Prestamo";
import { Pageable } from "../../core/model/page/Pageable";

export class PrestamoPage {
  content!: Prestamo[];
  pageable!: Pageable;
  totalElements!: number;
}