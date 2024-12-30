import {UtilisateurDTO} from "../Utilisateur/UtilisateurDTO.model";
import {AdresseDTO} from "../Adresse/AdresseDTO.model";
import {CaracteristiquesDTO} from "../Caracteristiques/CaracteristiquesDTO.model";
import {ContactDTO} from "../Contact/ContactDTO.model";
import {FraisDTO} from "../Frais/FraisDTO.model";
import {PeriodeDeLocationDTO} from "../PeriodeDeLocation/PeriodeDeLocationDTO.model";
import {PhotoDTO} from "../Photo/PhotoDTO.model";
import {AlerteDTO} from "../Alerte/AlerteDTO.model";
import {DocumentDTO} from "../Document/DocumentDTO.model";

export interface LogementDTO {
  masqueId: string;
  proprietaire: UtilisateurDTO;
  adresse: AdresseDTO | null;
  caracteristiques: CaracteristiquesDTO | null;
  contacts: ContactDTO[];
  frais: FraisDTO[];
  periodesDeLocation: PeriodeDeLocationDTO[];
  alertes: AlerteDTO[];
  photos: PhotoDTO[];
  documents: DocumentDTO[];
  gestionnaires: UtilisateurDTO[];
}
