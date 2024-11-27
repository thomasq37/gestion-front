import {TypeDeLocation} from "../../enumeration/TypeDeLocation.enum";
import {FraisDTO} from "../Frais/FraisDTO.model";
import {LocataireDTO} from "../Locataire/LocataireDTO.model";

export interface PeriodeDeLocationDTO {
  masqueId?: string;
  tarif: number;
  dateDeDebut: string;
  dateDeFin?: string;
  typeDeLocation: TypeDeLocation;
  frais?: FraisDTO[];
  locataires?: LocataireDTO[];
}
