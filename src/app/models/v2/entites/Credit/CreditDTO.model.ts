import {TypeDeTaux} from "../../enumeration/TypeDeTaux.enum";
import {FraisDTO} from "../Frais/FraisDTO.model";

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
  frais?: FraisDTO[];
}
