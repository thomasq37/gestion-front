export interface ReservationDTO {
  date: string;
  type: string;
  codeDeConfirmation: string;
  dateDeReservation: string;
  dateDeDebut: string;
  dateDeFin: string;
  nuits: number;
  voyageur: string;
  logement: string;
  details?: string;
  codeDeReference?: string;
  devise: string;
  montant: number;
  verse?: number;
  fraisDeService?: number;
  fraisDePaiementRapide?: number;
  fraisDeMenage: number;
  revenusBruts: number;
  taxesDeSejour: number;
  anneeDesRevenus?: number;
}
