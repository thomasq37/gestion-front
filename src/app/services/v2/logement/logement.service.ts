import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { LogementDTO } from "../../../models/v2/entites/Logement/LogementDTO.model";
import { fetchWithHandling } from "../http-helpers";
import { SuccessResponse } from "../../../models/v2/exception/SuccessResponse.model";
import { LogementVueEnsembleDTO } from "../../../models/v2/entites/Logement/LogementVueEnsembleDTO.model";
import {PeriodeDeLocationDTO} from "../../../models/v2/entites/PeriodeDeLocation/PeriodeDeLocationDTO.model";
import {CaracteristiquesDTO} from "../../../models/v2/entites/Caracteristiques/CaracteristiquesDTO.model";
import {AdresseDTO} from "../../../models/v2/entites/Adresse/AdresseDTO.model";
import {AlerteDTO} from "../../../models/v2/entites/Alerte/AlerteDTO.model";
import {DocumentDTO} from "../../../models/v2/entites/Document/DocumentDTO.model";
import {ContactDTO} from "../../../models/v2/entites/Contact/ContactDTO.model";
import {LocataireDTO} from "../../../models/v2/entites/Locataire/LocataireDTO.model";
import {PhotoDTO} from "../../../models/v2/entites/Photo/PhotoDTO.model";
import {FraisDTO} from "../../../models/v2/entites/Frais/FraisDTO.model";

@Injectable({
  providedIn: 'root',
})
export class LogementService {
  private apiUrl = `${environment.apiUrl}/logements`;

  // --- Cache local en mémoire ---
  private logementCache: Map<string, LogementDTO> = new Map();
  private logementsVueEnsembleCache: LogementVueEnsembleDTO[] | null = null;

  /**
   * Crée un logement (POST)
   */
  async creerLogement(): Promise<LogementDTO> {
    return fetchWithHandling<LogementDTO>(`${this.apiUrl}/ajouter`, {
      method: 'POST',
    });
  }

  /**
   * Liste tous les logements (GET)
   */
  async listerLogements(): Promise<LogementDTO[]> {
    return fetchWithHandling<LogementDTO[]>(`${this.apiUrl}/lister`, {
      method: 'GET',
    });
  }

  /**
   * Liste des logements en vue d’ensemble (GET)
   */
  async listerLogementsVueEnsemble(forceRefresh = false): Promise<LogementVueEnsembleDTO[]> {
    if (!forceRefresh && this.logementsVueEnsembleCache) {
      console.log("vue d'ensemble logements récupérée du cache");
      return this.logementsVueEnsembleCache;
    }

    const logements = await fetchWithHandling<LogementVueEnsembleDTO[]>(`${this.apiUrl}/lister/vue-ensemble`, {
      method: 'GET',
    });

    console.log("vue d'ensemble logements mise en cache");
    this.logementsVueEnsembleCache = logements;
    return logements;
  }


  /**
   * Récupère un logement en cache si disponible, sinon via l'API (GET)
   * @param logementMasqueId
   * @param forceRefresh si true, force l'appel API même si le cache est rempli
   */
  async obtenirLogement(logementMasqueId: string, forceRefresh = false): Promise<LogementDTO> {
    if (!forceRefresh) {
      const cached = this.logementCache.get(logementMasqueId);
      if (cached) {
        console.log("logement recupere en cache")
        return cached;
      }
    }

    const logement = await fetchWithHandling<LogementDTO>(`${this.apiUrl}/${logementMasqueId}/obtenir`, {
      method: 'GET',
    });
    console.log("logement mis en cache")

    this.logementCache.set(logementMasqueId, logement);
    return logement;
  }

  /**
   * Supprime un logement et invalide son cache (DELETE)
   * @param logementMasqueId
   */
  async supprimerLogement(logementMasqueId: string): Promise<SuccessResponse> {
    const result = await fetchWithHandling<SuccessResponse>(`${this.apiUrl}/${logementMasqueId}/supprimer`, {
      method: 'DELETE',
    });

    this.invalidateLogement(logementMasqueId);
    return result;
  }

  /**
   * Invalide un logement spécifique dans le cache
   * @param logementMasqueId
   */
  invalidateLogement(logementMasqueId: string): void {
    this.logementCache.delete(logementMasqueId);
  }

  /**
   * Vide complètement le cache
   */
  clearCache(): void {
    this.logementCache.clear();
  }

  mettreAJourPeriodeDansLogement(logementMasqueId: string, periode: PeriodeDeLocationDTO): void {
    const logement = this.logementCache.get(logementMasqueId);
    if (!logement || !logement.periodesDeLocation) return;

    const index = logement.periodesDeLocation.findIndex(p => p.masqueId === periode.masqueId);
    if (index !== -1) {
      logement.periodesDeLocation[index] = periode;
    } else {
      logement.periodesDeLocation.push(periode);
    }
  }

  supprimerPeriodeDansLogement(logementMasqueId: string, periodeMasqueId: string): void {
    const logement = this.logementCache.get(logementMasqueId);
    if (!logement || !logement.periodesDeLocation) return;

    logement.periodesDeLocation = logement.periodesDeLocation.filter(
      p => p.masqueId !== periodeMasqueId
    );
  }

  mettreAJourCaracteristiquesDansLogement(logementMasqueId: string, dto: CaracteristiquesDTO): void {
    const logement = this.logementCache.get(logementMasqueId);
    if (!logement) return;
    logement.caracteristiques = dto;
  }

  supprimerCaracteristiquesDansLogement(logementMasqueId: string): void {
    const logement = this.logementCache.get(logementMasqueId);
    if (!logement) return;
    logement.caracteristiques = undefined;
  }
  mettreAJourAdresseDansLogement(logementMasqueId: string, dto: AdresseDTO): void {
    const logement = this.logementCache.get(logementMasqueId);
    if (!logement) return;
    logement.adresse = dto;
  }

  supprimerAdresseDansLogement(logementMasqueId: string): void {
    const logement = this.logementCache.get(logementMasqueId);
    if (!logement) return;
    logement.adresse = undefined;
  }

  mettreAJourAlerteDansLogement(logementMasqueId: string, alerte: AlerteDTO): void {
    const logement = this.logementCache.get(logementMasqueId);
    if (!logement || !logement.alertes) return;

    const index = logement.alertes.findIndex(a => a.masqueId === alerte.masqueId);
    if (index !== -1) {
      logement.alertes[index] = alerte;
    } else {
      logement.alertes.push(alerte);
    }
  }

  supprimerAlerteDansLogement(logementMasqueId: string, alerteMasqueId: string): void {
    const logement = this.logementCache.get(logementMasqueId);
    if (!logement || !logement.alertes) return;

    logement.alertes = logement.alertes.filter(a => a.masqueId !== alerteMasqueId);
  }

  mettreAJourDocumentDansLogement(logementMasqueId: string, document: DocumentDTO): void {
    const logement = this.logementCache.get(logementMasqueId);
    if (!logement) return;

    if (!logement.documents) logement.documents = [];

    const index = logement.documents.findIndex(d => d.masqueId === document.masqueId);
    if (index !== -1) {
      logement.documents[index] = document;
    } else {
      logement.documents.push(document);
    }
  }

  supprimerDocumentDansLogement(logementMasqueId: string, documentMasqueId: string): void {
    const logement = this.logementCache.get(logementMasqueId);
    if (!logement || !logement.documents) return;

    logement.documents = logement.documents.filter(d => d.masqueId !== documentMasqueId);
  }

  mettreAJourContactDansLogement(logementMasqueId: string, contact: ContactDTO): void {
    const logement = this.logementCache.get(logementMasqueId);
    if (!logement) return;

    if (!logement.contacts) logement.contacts = [];

    const index = logement.contacts.findIndex(c => c.masqueId === contact.masqueId);
    if (index !== -1) {
      logement.contacts[index] = contact;
    } else {
      logement.contacts.push(contact);
    }
  }

  supprimerContactDansLogement(logementMasqueId: string, contactMasqueId: string): void {
    const logement = this.logementCache.get(logementMasqueId);
    if (!logement || !logement.contacts) return;

    logement.contacts = logement.contacts.filter(c => c.masqueId !== contactMasqueId);
  }

  mettreAJourLocataireDansLogement(logementMasqueId: string, periodeMasqueId: string, locataire: LocataireDTO): void {
    const logement = this.logementCache.get(logementMasqueId);
    if (!logement || !logement.periodesDeLocation) return;

    const periode = logement.periodesDeLocation.find(p => p.masqueId === periodeMasqueId);
    if (!periode) return;

    if (!periode.locataires) {
      periode.locataires = [];
    }

    const index = periode.locataires.findIndex(l => l.masqueId === locataire.masqueId);
    if (index !== -1) {
      periode.locataires[index] = locataire;
    } else {
      periode.locataires.push(locataire);
    }
  }
  supprimerLocataireDansLogement(logementMasqueId: string, periodeMasqueId: string, locataireMasqueId: string): void {
    const logement = this.logementCache.get(logementMasqueId);
    if (!logement || !logement.periodesDeLocation) return;

    const periode = logement.periodesDeLocation.find(p => p.masqueId === periodeMasqueId);
    if (!periode || !periode.locataires) return;

    periode.locataires = periode.locataires.filter(l => l.masqueId !== locataireMasqueId);
  }
  mettreAJourPhotoDansLogement(logementMasqueId: string, photo: PhotoDTO): void {
    const logement = this.logementCache.get(logementMasqueId);
    if (!logement) return;

    if (!logement.photos) logement.photos = [];

    // Si la photo à mettre à jour est principale, enlever le flag aux autres
    if (photo.isPrincipal) {
      logement.photos.forEach(p => {
        if (p.masqueId !== photo.masqueId) {
          p.isPrincipal = false;
        }
      });
    }

    const index = logement.photos.findIndex(p => p.masqueId === photo.masqueId);
    if (index !== -1) {
      logement.photos[index] = photo;
    } else {
      logement.photos.push(photo);
    }

    // Toujours trier après mise à jour
    logement.photos.sort((a, b) => (b.isPrincipal ? 1 : 0) - (a.isPrincipal ? 1 : 0));
  }


  supprimerPhotoDansLogement(logementMasqueId: string, photoMasqueId: string): void {
    const logement = this.logementCache.get(logementMasqueId);
    if (!logement || !logement.photos) return;

    logement.photos = logement.photos.filter(p => p.masqueId !== photoMasqueId);
  }
  mettreAJourFraisDansLogement(logementMasqueId: string, frais: FraisDTO, periodeMasqueId?: string): void {
    const logement = this.logementCache.get(logementMasqueId);
    if (!logement) return;

    const liste = periodeMasqueId
      ? logement.periodesDeLocation.find(p => p.masqueId === periodeMasqueId)?.frais
      : logement.frais;

    if (!liste) return;

    const index = liste.findIndex(f => f.masqueId === frais.masqueId);
    if (index > -1) {
      liste[index] = frais;
    } else {
      liste.push(frais);
    }
  }

  supprimerFraisDansLogement(logementMasqueId: string, fraisMasqueId: string, periodeMasqueId?: string): void {
    const logement = this.logementCache.get(logementMasqueId);
    if (!logement) return;

    const liste = periodeMasqueId
      ? logement.periodesDeLocation.find(p => p.masqueId === periodeMasqueId)?.frais
      : logement.frais;

    if (!liste) return;

    const index = liste.findIndex(f => f.masqueId === fraisMasqueId);
    if (index > -1) {
      liste.splice(index, 1);
    }
  }

  getLogementDepuisCache(logementMasqueId: string): LogementDTO | undefined {
    return this.logementCache.get(logementMasqueId);
  }
}
