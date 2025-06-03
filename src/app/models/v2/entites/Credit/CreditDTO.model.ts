import {TypeDeTaux} from "../../enumeration/TypeDeTaux.enum";

export interface CreditDTO {
  masqueId?: string;
  montantEmprunte: number;
  tauxAnnuelEffectifGlobal: number;
  dureeMois: number;
  mensualite: number;
  coutTotal: number;
  typeDeTaux: TypeDeTaux;
  jourDePaiementEcheance: number;
  dateDebut: string;

}
