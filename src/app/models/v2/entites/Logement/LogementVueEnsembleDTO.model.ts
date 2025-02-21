import {AdresseDTO} from "../Adresse/AdresseDTO.model";
import {CaracteristiquesDTO} from "../Caracteristiques/CaracteristiquesDTO.model";
import {PeriodeDeLocationDTO} from "../PeriodeDeLocation/PeriodeDeLocationDTO.model";
import {PhotoDTO} from "../Photo/PhotoDTO.model";
import {AlerteDTO} from "../Alerte/AlerteDTO.model";

export interface LogementVueEnsembleDTO {
  masqueId: string;
  adresse: AdresseDTO | null;
  caracteristiques: CaracteristiquesDTO | null;
  periodesDeLocation: PeriodeDeLocationDTO[];
  alertes: AlerteDTO[];
  photos: PhotoDTO[];
}
