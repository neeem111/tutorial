import { Prestamo } from "./Prestamo";

export const PRESTAMO_DATA: Prestamo[] = [
  {
    id: 1,
    game: { id: 1, title: 'Juego 1' } as any,
    client: { id: 1, name: 'Cliente 1' } as any,
    dateStart: new Date('2026-01-01'),
    dateEnd: new Date('2026-01-06'),
  },
  {
    id: 2,
    game: { id: 2, title: 'Juego 2' } as any,
    client: { id: 1, name: 'Cliente 1' } as any,
    dateStart: new Date('2026-01-02'),
    dateEnd: new Date('2026-01-14'),
  }
];