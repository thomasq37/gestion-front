import {Pays} from "../../enumeration/Pays.enum";

export interface AdresseDTO {
  masqueId?: string
  numero: string;
  voie: string;
  complementAdresse?: string;
  codePostal: string;
  ville: string;
  pays: Pays;
}
